# Deployment Documentation Research Tool

This tool keeps Platinum VC Studios deployment instructions tied to current official Vercel and Railway documentation.

## What it does

- Crawls only the approved official URLs in `sources.json`
- Rejects non-HTTPS or unapproved hosts
- Checks `robots.txt` and stops when permission cannot be verified
- Rate limits requests
- Extracts headings, instructional text, and code examples
- Stores normalized JSON snapshots
- Compares current snapshots with a reviewed baseline
- Writes a human-readable change report

It does **not** log into dashboards, bypass access controls, scrape private account data, or automatically rewrite student lessons.

## Setup

```bash
cd tools/deployment_research
python -m venv .venv
```

Activate the virtual environment:

```bash
# macOS or Linux
source .venv/bin/activate

# Windows PowerShell
.venv\Scripts\Activate.ps1
```

No third-party packages are required. The crawler uses Python 3.11+ standard-library modules only.

## First verified snapshot

```bash
python crawl.py crawl
```

Review every file under `snapshots/current/` against the official page and manually perform the dashboard flow with a clean test account.

After review:

```bash
python crawl.py accept
```

The accepted snapshots become the comparison baseline.

## Recheck later

```bash
python crawl.py crawl
python crawl.py check
```

Exit codes:

- `0`: all sources were fetched and no normalized changes were found
- `1`: fetch, configuration, permission, or baseline problem
- `2`: documentation changed and needs human review

The change report is written to `tools/deployment_research/reports/changes.md`.

## Verification rule

A crawler result is research evidence, not final student instruction. A deployment guide is publishable only after:

1. Official documentation was captured.
2. The flow was performed with a clean test repository.
3. The authenticated dashboard labels were manually checked.
4. The generated URL was opened.
5. Root and nested routes were refreshed directly.
6. A production build and deployment log were reviewed.
7. The guide received a `Last verified` date.

## Updating the source list

Only add first-party documentation pages. Keep the host allowlist in `crawl.py` and the source record in `sources.json` aligned. Do not add forums, personal blogs, affiliate tutorials, or search-result pages as baseline authorities.
