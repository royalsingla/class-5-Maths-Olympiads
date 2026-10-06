#!/usr/bin/env node
// Regenerates pdf/<same path>.pdf for every Markdown file in this repo.
//
// Usage:
//   cd tools
//   npm install
//   npx playwright install chromium   # one-time, downloads a local Chromium
//   node generate-pdfs.js
//
// It walks the repo for .md files (skipping .git/, node_modules/, pdf/ and
// tools/ itself), renders each with `marked`, and prints each to PDF with a
// headless Chromium (via Playwright) using the same stylesheet every time so
// all documents look consistent. Markdown images (e.g. the SVG diagrams
// under assignments/*/images/) are resolved relative to the source file.

const fs = require('fs');
const path = require('path');
const { marked } = require('marked');
const { chromium } = require('playwright');

const REPO = path.resolve(__dirname, '..');
const OUT = path.join(REPO, 'pdf');
const SKIP_DIRS = new Set(['.git', 'node_modules', 'pdf', 'tools']);

function findMarkdownFiles(dir) {
  let results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.')) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) continue;
      results = results.concat(findMarkdownFiles(full));
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      results.push(full);
    }
  }
  return results;
}

function titleFor(absPath, raw) {
  const m = raw.match(/^#\s+(.+)$/m);
  if (m) return m[1].trim();
  return path.basename(absPath, '.md');
}

const css = `
  @page { size: A4; margin: 20mm 16mm; }
  * { box-sizing: border-box; }
  body {
    font-family: 'Georgia', 'Times New Roman', serif;
    color: #1a1a1a;
    line-height: 1.55;
    font-size: 12pt;
  }
  h1 {
    font-size: 19pt;
    border-bottom: 2.5px solid #2b4c7e;
    padding-bottom: 6px;
    margin-top: 0;
    color: #16314f;
  }
  h2 {
    font-size: 14.5pt;
    color: #2b4c7e;
    margin-top: 26px;
    border-bottom: 1px solid #c9d6e8;
    padding-bottom: 3px;
  }
  h3 { font-size: 12.5pt; color: #2b4c7e; margin-top: 18px; }
  p { margin: 8px 0; }
  strong { color: #16314f; }
  table {
    border-collapse: collapse;
    width: 100%;
    margin: 12px 0 18px 0;
    font-size: 10.5pt;
  }
  th, td {
    border: 1px solid #a9b7c9;
    padding: 5px 8px;
    text-align: left;
    vertical-align: top;
  }
  th { background: #e9eef6; color: #16314f; }
  tr:nth-child(even) td { background: #f7f9fc; }
  code {
    background: #eef1f6;
    padding: 1px 4px;
    border-radius: 3px;
    font-family: 'Courier New', monospace;
    font-size: 10.5pt;
  }
  ul, ol { margin: 6px 0 6px 20px; padding: 0; }
  li { margin: 3px 0; }
  hr { border: none; border-top: 1px solid #c9d6e8; margin: 22px 0; }
  blockquote {
    border-left: 3px solid #2b4c7e;
    margin: 12px 0;
    padding: 4px 14px;
    color: #39506b;
    background: #f7f9fc;
  }
  a { color: #2b4c7e; }
  img {
    max-width: 100%;
    display: block;
    margin: 10px auto;
  }
  .doc-footer {
    margin-top: 28px;
    padding-top: 8px;
    border-top: 1px solid #c9d6e8;
    font-size: 9pt;
    color: #7a899b;
  }
`;

function toHtml(raw, title) {
  const body = marked.parse(raw);
  return `<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>${title}</title>
<style>${css}</style>
</head>
<body>
${body}
<div class="doc-footer">Class 5 Maths Olympiad — Prep Kit</div>
</body>
</html>`;
}

(async () => {
  const mdFiles = findMarkdownFiles(REPO).sort();
  console.log(`Found ${mdFiles.length} Markdown files.`);

  // Some containers ship a pre-installed Chromium at a fixed path instead of
  // the revision `npx playwright install` would fetch — use it when present.
  const preinstalled = '/opt/pw-browsers/chromium';
  const launchOpts = fs.existsSync(preinstalled) ? { executablePath: preinstalled } : {};
  const browser = await chromium.launch(launchOpts);
  const page = await browser.newPage();

  for (const srcPath of mdFiles) {
    const raw = fs.readFileSync(srcPath, 'utf8');
    const title = titleFor(srcPath, raw);
    const html = toHtml(raw, title);

    const relPath = path.relative(REPO, srcPath);
    const outPath = path.join(OUT, relPath.replace(/\.md$/, '.pdf'));
    fs.mkdirSync(path.dirname(outPath), { recursive: true });

    // Write a temp HTML file next to the source markdown so the page's own
    // origin is file:// and relative image paths (e.g. images/foo.svg)
    // resolve. (Chromium blocks file:// subresource loads from a page
    // loaded via page.setContent(), whose origin is about:blank.)
    const tmpHtmlPath = srcPath.replace(/\.md$/, '.__render_tmp__.html');
    fs.writeFileSync(tmpHtmlPath, html);
    try {
      await page.goto('file://' + tmpHtmlPath, { waitUntil: 'networkidle' });
      await page.pdf({
        path: outPath,
        format: 'A4',
        printBackground: true,
        margin: { top: '0mm', bottom: '0mm', left: '0mm', right: '0mm' },
      });
      console.log('wrote', path.relative(REPO, outPath));
    } finally {
      fs.unlinkSync(tmpHtmlPath);
    }
  }

  await browser.close();
})();
