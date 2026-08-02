#!/usr/bin/env python3
"""Crawl and compare approved official Vercel and Railway documentation."""
from __future__ import annotations

import argparse
import difflib
import hashlib
import json
import re
import shutil
import sys
import time
from dataclasses import asdict, dataclass
from datetime import datetime, timezone
from html.parser import HTMLParser
from pathlib import Path
from typing import Any
from urllib.error import HTTPError, URLError
from urllib.parse import urlparse
from urllib.request import Request, urlopen
from urllib.robotparser import RobotFileParser

ROOT = Path(__file__).resolve().parent
CONFIG = ROOT / "sources.json"
CURRENT = ROOT / "snapshots" / "current"
BASELINE = ROOT / "snapshots" / "baseline"
REPORT = ROOT / "reports" / "changes.md"
ALLOWED_HOSTS = {"vercel.com", "www.vercel.com", "docs.railway.com"}
BLOCKED_TAGS = {"script", "style", "noscript", "svg", "nav", "footer", "header", "aside", "form", "button"}
TEXT_TAGS = {"h1", "h2", "h3", "h4", "p", "li", "pre", "code"}
DOCUMENT_FORMATS = {
    "text/html": "html",
    "application/xhtml+xml": "html",
    "text/markdown": "markdown",
    "text/x-markdown": "markdown",
    "application/markdown": "markdown",
}
ACCEPT_HEADER = ",".join(
    (
        "text/html",
        "application/xhtml+xml",
        "text/markdown",
        "text/x-markdown",
        "application/markdown;q=0.9",
    )
)


@dataclass(frozen=True)
class Source:
    id: str
    platform: str
    title: str
    url: str
    topics: list[str]


@dataclass
class ParsedDocument:
    page_title: str
    headings: list[dict[str, Any]]
    instructions: list[str]
    code_blocks: list[str]
    ordered_text: list[str]


@dataclass
class Snapshot:
    schema_version: int
    source_id: str
    platform: str
    configured_title: str
    page_title: str
    url: str
    fetched_at: str
    http_status: int
    content_type: str
    document_format: str
    etag: str | None
    last_modified: str | None
    content_hash: str
    headings: list[dict[str, Any]]
    instructions: list[str]
    code_blocks: list[str]
    body_text: str


class InstructionParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.title = ""
        self.in_title = False
        self.blocked_depth = 0
        self.current_tag: str | None = None
        self.current_parts: list[str] = []
        self.headings: list[dict[str, Any]] = []
        self.instructions: list[str] = []
        self.code_blocks: list[str] = []
        self.ordered_text: list[str] = []

    @staticmethod
    def clean(value: str) -> str:
        return re.sub(r"\s+", " ", value).strip()

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        if tag == "title":
            self.in_title = True
        if tag in BLOCKED_TAGS:
            self.blocked_depth += 1
        if self.blocked_depth == 0 and tag in TEXT_TAGS:
            self.current_tag = tag
            self.current_parts = []

    def handle_endtag(self, tag: str) -> None:
        if tag == "title":
            self.in_title = False
        if self.blocked_depth == 0 and tag == self.current_tag:
            raw = "".join(self.current_parts)
            text = raw.strip() if tag in {"pre", "code"} else self.clean(raw)
            if text:
                if tag.startswith("h"):
                    self.headings.append({"level": int(tag[1]), "text": self.clean(text)})
                elif tag in {"p", "li"} and text not in self.instructions:
                    self.instructions.append(text)
                elif tag in {"pre", "code"} and text not in self.code_blocks:
                    self.code_blocks.append(text)
                self.ordered_text.append(self.clean(text))
            self.current_tag = None
            self.current_parts = []
        if tag in BLOCKED_TAGS and self.blocked_depth:
            self.blocked_depth -= 1

    def handle_data(self, data: str) -> None:
        if self.in_title:
            self.title += data
        if self.blocked_depth == 0 and self.current_tag:
            self.current_parts.append(data)


def load_config(path: Path) -> tuple[dict[str, Any], list[Source]]:
    data = json.loads(path.read_text(encoding="utf-8"))
    return data, [Source(**item) for item in data["sources"]]


def validate_source(source: Source) -> None:
    parsed = urlparse(source.url)
    if parsed.scheme != "https":
        raise ValueError(f"{source.id}: only HTTPS sources are allowed")
    if parsed.hostname not in ALLOWED_HOSTS:
        raise ValueError(f"{source.id}: host is not approved: {parsed.hostname}")


def normalized_media_type(content_type: str) -> str:
    return content_type.split(";", 1)[0].strip().lower()


def document_format_for(content_type: str) -> str:
    media_type = normalized_media_type(content_type)
    document_format = DOCUMENT_FORMATS.get(media_type)
    if document_format is None:
        raise RuntimeError(f"Expected HTML or Markdown, received {content_type!r}")
    return document_format


def fetch_document(
    url: str, user_agent: str, timeout: float
) -> tuple[int, dict[str, str], str, str, str]:
    request = Request(url, headers={"User-Agent": user_agent, "Accept": ACCEPT_HEADER})
    try:
        with urlopen(request, timeout=timeout) as response:
            status = getattr(response, "status", 200)
            headers = {key.lower(): value for key, value in response.headers.items()}
            content_type = headers.get("content-type", "")
            document_format = document_format_for(content_type)
            charset = response.headers.get_content_charset() or "utf-8"
            body = response.read().decode(charset, errors="replace")
            return status, headers, content_type, document_format, body
    except (HTTPError, URLError, TimeoutError) as exc:
        raise RuntimeError(f"Request failed for {url}: {exc}") from exc


def robots_allows(url: str, user_agent: str, timeout: float) -> bool:
    parsed = urlparse(url)
    robots_url = f"{parsed.scheme}://{parsed.netloc}/robots.txt"
    request = Request(robots_url, headers={"User-Agent": user_agent})
    try:
        with urlopen(request, timeout=timeout) as response:
            text = response.read().decode("utf-8", errors="replace")
    except (HTTPError, URLError, TimeoutError) as exc:
        raise RuntimeError(f"Could not verify robots.txt for {url}: {exc}") from exc
    parser = RobotFileParser()
    parser.set_url(robots_url)
    parser.parse(text.splitlines())
    return parser.can_fetch(user_agent, url)


def parse_html_document(html: str, fallback_title: str) -> ParsedDocument:
    parser = InstructionParser()
    parser.feed(html)
    return ParsedDocument(
        page_title=InstructionParser.clean(parser.title) or fallback_title,
        headings=parser.headings,
        instructions=parser.instructions,
        code_blocks=parser.code_blocks,
        ordered_text=parser.ordered_text,
    )


def clean_markdown_inline(value: str) -> str:
    value = re.sub(r"!\[([^\]]*)\]\([^)]*\)", r"\1", value)
    value = re.sub(r"\[([^\]]+)\]\([^)]*\)", r"\1", value)
    value = re.sub(r"\[([^\]]+)\]\[[^\]]*\]", r"\1", value)
    value = re.sub(r"<((?:https?://|mailto:)[^>]+)>", r"\1", value)
    value = re.sub(r"</?[A-Za-z][^>]*>", " ", value)
    value = value.replace("`", "")
    value = value.replace("**", "").replace("__", "").replace("~~", "")
    value = re.sub(r"\\([\\`*{}\[\]()#+\-.!_>])", r"\1", value)
    return InstructionParser.clean(value)


def parse_front_matter(lines: list[str]) -> tuple[str, list[str]]:
    if not lines or lines[0].strip() != "---":
        return "", lines
    title = ""
    for index in range(1, len(lines)):
        line = lines[index]
        if line.strip() == "---":
            return title, lines[index + 1 :]
        match = re.match(r"^title\s*:\s*(.+)$", line, flags=re.IGNORECASE)
        if match:
            title = clean_markdown_inline(match.group(1).strip().strip('"\''))
    return "", lines


def parse_markdown_document(markdown: str, fallback_title: str) -> ParsedDocument:
    front_matter_title, lines = parse_front_matter(markdown.replace("\r\n", "\n").split("\n"))
    headings: list[dict[str, Any]] = []
    instructions: list[str] = []
    code_blocks: list[str] = []
    ordered_text: list[str] = []
    paragraph_parts: list[str] = []
    code_parts: list[str] = []
    in_code = False
    fence_marker = ""

    def add_instruction(text: str) -> None:
        cleaned = clean_markdown_inline(text)
        if cleaned and cleaned not in instructions:
            instructions.append(cleaned)
        if cleaned:
            ordered_text.append(cleaned)

    def flush_paragraph() -> None:
        if paragraph_parts:
            add_instruction(" ".join(paragraph_parts))
            paragraph_parts.clear()

    def flush_code() -> None:
        code = "\n".join(code_parts).strip("\n")
        if code and code not in code_blocks:
            code_blocks.append(code)
        if code:
            ordered_text.append(code)
        code_parts.clear()

    for raw_line in lines:
        stripped = raw_line.strip()
        fence_match = re.match(r"^(`{3,}|~{3,})", stripped)
        if fence_match:
            marker = fence_match.group(1)
            if not in_code:
                flush_paragraph()
                in_code = True
                fence_marker = marker[0]
            elif marker[0] == fence_marker:
                in_code = False
                flush_code()
                fence_marker = ""
            continue

        if in_code:
            code_parts.append(raw_line.rstrip())
            continue

        if not stripped:
            flush_paragraph()
            continue

        if re.match(r"^(?:import|export)\s", stripped) or re.match(r"^</?[A-Z][A-Za-z0-9_.:-]*(?:\s|>|/)", stripped):
            flush_paragraph()
            continue

        heading_match = re.match(r"^(#{1,6})\s+(.+?)\s*#*\s*$", stripped)
        if heading_match:
            flush_paragraph()
            heading_text = clean_markdown_inline(heading_match.group(2))
            if heading_text:
                headings.append({"level": len(heading_match.group(1)), "text": heading_text})
                ordered_text.append(heading_text)
            continue

        if re.match(r"^(?:-{3,}|\*{3,}|_{3,})$", stripped):
            flush_paragraph()
            continue

        list_match = re.match(r"^\s*(?:[-+*]|\d+[.)])\s+(.+)$", raw_line)
        if list_match:
            flush_paragraph()
            add_instruction(list_match.group(1))
            continue

        quote_match = re.match(r"^>\s?(.*)$", stripped)
        if quote_match:
            flush_paragraph()
            add_instruction(quote_match.group(1))
            continue

        reference_definition = re.match(r"^\[[^\]]+\]:\s+\S+", stripped)
        if reference_definition:
            flush_paragraph()
            continue

        paragraph_parts.append(stripped)

    flush_paragraph()
    if in_code:
        flush_code()

    first_h1 = next((item["text"] for item in headings if item["level"] == 1), "")
    return ParsedDocument(
        page_title=front_matter_title or first_h1 or fallback_title,
        headings=headings,
        instructions=instructions,
        code_blocks=code_blocks,
        ordered_text=ordered_text,
    )


def parse_document(body: str, document_format: str, fallback_title: str) -> ParsedDocument:
    if document_format == "html":
        return parse_html_document(body, fallback_title)
    if document_format == "markdown":
        return parse_markdown_document(body, fallback_title)
    raise ValueError(f"Unsupported document format: {document_format}")


def make_snapshot(source: Source, user_agent: str, timeout: float) -> Snapshot:
    validate_source(source)
    if not robots_allows(source.url, user_agent, timeout):
        raise PermissionError(f"robots.txt does not allow {source.url}")
    status, headers, content_type, document_format, body = fetch_document(source.url, user_agent, timeout)
    parsed = parse_document(body, document_format, source.title)
    body_text = "\n".join(parsed.ordered_text)
    if not body_text.strip():
        raise RuntimeError(f"No instructional content extracted from {source.url}")
    return Snapshot(
        schema_version=2,
        source_id=source.id,
        platform=source.platform,
        configured_title=source.title,
        page_title=parsed.page_title,
        url=source.url,
        fetched_at=datetime.now(timezone.utc).isoformat(),
        http_status=status,
        content_type=content_type,
        document_format=document_format,
        etag=headers.get("etag"),
        last_modified=headers.get("last-modified"),
        content_hash=hashlib.sha256(body_text.encode("utf-8")).hexdigest(),
        headings=parsed.headings,
        instructions=parsed.instructions,
        code_blocks=parsed.code_blocks,
        body_text=body_text,
    )


def path_for(directory: Path, source_id: str) -> Path:
    return directory / f"{source_id}.json"


def write_snapshot(directory: Path, snapshot: Snapshot) -> None:
    directory.mkdir(parents=True, exist_ok=True)
    path_for(directory, snapshot.source_id).write_text(
        json.dumps(asdict(snapshot), indent=2, ensure_ascii=False) + "\n", encoding="utf-8"
    )


def crawl(args: argparse.Namespace) -> int:
    config, sources = load_config(args.config)
    if args.platform:
        sources = [source for source in sources if source.platform == args.platform]
    if not sources:
        print("No matching sources.", file=sys.stderr)
        return 1
    failures = 0
    for index, source in enumerate(sources):
        if index:
            time.sleep(float(config.get("request_delay_seconds", 1.5)))
        try:
            snapshot = make_snapshot(source, config["user_agent"], args.timeout)
            write_snapshot(args.current, snapshot)
            print(f"OK  {source.id}  {snapshot.document_format}  {snapshot.content_hash[:12]}")
        except Exception as exc:
            failures += 1
            print(f"ERR {source.id}: {exc}", file=sys.stderr)
    return 1 if failures else 0


def accept(args: argparse.Namespace) -> int:
    if not args.current.exists():
        print("No current snapshots. Run crawl first.", file=sys.stderr)
        return 1
    if args.baseline.exists():
        shutil.rmtree(args.baseline)
    shutil.copytree(args.current, args.baseline)
    print(f"Accepted {len(list(args.baseline.glob('*.json')))} baseline snapshots.")
    return 0


def read_json(path: Path) -> dict[str, Any]:
    return json.loads(path.read_text(encoding="utf-8"))


def compare(baseline: Path, current: Path) -> list[dict[str, Any]]:
    changes: list[dict[str, Any]] = []
    ids = {p.stem for p in baseline.glob("*.json")} | {p.stem for p in current.glob("*.json")}
    for source_id in sorted(ids):
        old_path, new_path = path_for(baseline, source_id), path_for(current, source_id)
        if not old_path.exists():
            changes.append({"source_id": source_id, "kind": "added", "diff": ""})
            continue
        if not new_path.exists():
            changes.append({"source_id": source_id, "kind": "missing", "diff": ""})
            continue
        old, new = read_json(old_path), read_json(new_path)
        if old.get("content_hash") == new.get("content_hash"):
            continue
        diff = "\n".join(
            difflib.unified_diff(
                old.get("body_text", "").splitlines(),
                new.get("body_text", "").splitlines(),
                fromfile=f"baseline/{source_id}",
                tofile=f"current/{source_id}",
                lineterm="",
                n=3,
            )
        )
        changes.append(
            {
                "source_id": source_id,
                "kind": "changed",
                "url": new.get("url") or old.get("url"),
                "old_hash": old.get("content_hash"),
                "new_hash": new.get("content_hash"),
                "diff": diff,
            }
        )
    return changes


def write_report(changes: list[dict[str, Any]], output: Path) -> None:
    output.parent.mkdir(parents=True, exist_ok=True)
    lines = [
        "# Deployment Documentation Change Report",
        "",
        f"Generated: {datetime.now(timezone.utc).isoformat()}",
        "",
    ]
    if not changes:
        lines.append("No normalized content changes detected.")
    else:
        lines.extend(["Changes require human review. Do not automatically rewrite student instructions.", ""])
        for change in changes:
            lines.extend([f"## {change['source_id']}", "", f"- Status: `{change['kind']}`"])
            for key, label in (("url", "Source"), ("old_hash", "Previous hash"), ("new_hash", "Current hash")):
                if change.get(key):
                    lines.append(f"- {label}: {change[key]}")
            if change.get("diff"):
                lines.extend(["", "```diff", change["diff"][:20000], "```"])
            lines.append("")
    output.write_text("\n".join(lines).rstrip() + "\n", encoding="utf-8")


def check(args: argparse.Namespace) -> int:
    if not args.baseline.exists() or not args.current.exists():
        print("Accepted baseline and current snapshots are required.", file=sys.stderr)
        return 1
    changes = compare(args.baseline, args.current)
    write_report(changes, args.report)
    if changes:
        print(f"{len(changes)} source(s) changed. Review {args.report}", file=sys.stderr)
        return 2
    print("No normalized documentation changes detected.")
    return 0


def report(args: argparse.Namespace) -> int:
    if not args.baseline.exists() or not args.current.exists():
        print("Accepted baseline and current snapshots are required.", file=sys.stderr)
        return 1
    write_report(compare(args.baseline, args.current), args.report)
    print(args.report)
    return 0


def parser() -> argparse.ArgumentParser:
    result = argparse.ArgumentParser(description=__doc__)
    result.add_argument("command", choices=("crawl", "accept", "check", "report"))
    result.add_argument("--config", type=Path, default=CONFIG)
    result.add_argument("--current", type=Path, default=CURRENT)
    result.add_argument("--baseline", type=Path, default=BASELINE)
    result.add_argument("--report", type=Path, default=REPORT)
    result.add_argument("--platform", choices=("vercel", "railway"))
    result.add_argument("--timeout", type=float, default=30.0)
    return result


def main() -> int:
    args = parser().parse_args()
    return {"crawl": crawl, "accept": accept, "check": check, "report": report}[args.command](args)


if __name__ == "__main__":
    raise SystemExit(main())
