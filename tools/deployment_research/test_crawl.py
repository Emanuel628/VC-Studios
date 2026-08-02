from __future__ import annotations

import unittest

import crawl


class ContentTypeTests(unittest.TestCase):
    def test_accepts_html_with_charset(self) -> None:
        self.assertEqual(crawl.document_format_for("text/html; charset=utf-8"), "html")

    def test_accepts_markdown_with_charset(self) -> None:
        self.assertEqual(crawl.document_format_for("text/markdown; charset=utf-8"), "markdown")

    def test_accepts_markdown_aliases(self) -> None:
        self.assertEqual(crawl.document_format_for("text/x-markdown"), "markdown")
        self.assertEqual(crawl.document_format_for("application/markdown"), "markdown")

    def test_rejects_unapproved_document_type(self) -> None:
        with self.assertRaisesRegex(RuntimeError, "Expected HTML or Markdown"):
            crawl.document_format_for("application/json")


class MarkdownParserTests(unittest.TestCase):
    def test_extracts_front_matter_headings_instructions_and_code(self) -> None:
        markdown = """---
title: \"Deploy a Vite project\"
description: Test document
---

# Deploy from Git

Connect your [GitHub repository](https://github.com/example/project).

1. Select **Add New**.
2. Select `Project`.

```bash
npm run build
```

<Callout type=\"warning\">
Useful warning text inside the wrapper.
</Callout>
"""
        parsed = crawl.parse_markdown_document(markdown, "Fallback")

        self.assertEqual(parsed.page_title, "Deploy a Vite project")
        self.assertIn({"level": 1, "text": "Deploy from Git"}, parsed.headings)
        self.assertIn("Connect your GitHub repository.", parsed.instructions)
        self.assertIn("Select Add New.", parsed.instructions)
        self.assertIn("Select Project.", parsed.instructions)
        self.assertIn("Useful warning text inside the wrapper.", parsed.instructions)
        self.assertEqual(parsed.code_blocks, ["npm run build"])
        self.assertFalse(any("Callout" in item for item in parsed.instructions))

    def test_uses_first_h1_when_front_matter_has_no_title(self) -> None:
        parsed = crawl.parse_markdown_document("# Public Networking\n\nGenerate a domain.", "Fallback")
        self.assertEqual(parsed.page_title, "Public Networking")

    def test_preserves_unclosed_code_fence_content(self) -> None:
        parsed = crawl.parse_markdown_document("# Build\n\n```json\n{\"output\": \"dist\"}", "Fallback")
        self.assertEqual(parsed.code_blocks, ['{\"output\": \"dist\"}'])


class HtmlParserTests(unittest.TestCase):
    def test_html_path_remains_supported(self) -> None:
        html = """<html><head><title>Railway Docs</title></head><body>
        <main><h1>Deploy</h1><p>Choose a repository.</p><pre>npm run build</pre></main>
        </body></html>"""
        parsed = crawl.parse_html_document(html, "Fallback")

        self.assertEqual(parsed.page_title, "Railway Docs")
        self.assertIn({"level": 1, "text": "Deploy"}, parsed.headings)
        self.assertIn("Choose a repository.", parsed.instructions)
        self.assertIn("npm run build", parsed.code_blocks)


if __name__ == "__main__":
    unittest.main()
