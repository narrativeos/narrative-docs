#!/usr/bin/env node

import fs from 'node:fs/promises';
import path from 'node:path';

const INPUT_FILE = 'assets/datasets/novel100_kepub_fulltext_top10.json';
const OUTPUT_ROOT = 'assets/datasets/fulltext/novel100_kepub_fulltext_top10';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const stripTags = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<br\s*\/?\s*>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

function safeName(input) {
  return String(input)
    .replace(/[\\/:*?"<>|]/g, '_')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractBookNo(url) {
  const m = String(url).match(/\/book\/(\d+)/);
  return m ? m[1] : '';
}

function extractChapterLinks(bookNo, html) {
  const re = new RegExp(`href="(\\/book\\/${bookNo}\\/\\d+)"`, 'g');
  const seen = new Set();
  const links = [];
  let m;
  while ((m = re.exec(html)) !== null) {
    const rel = m[1];
    if (!seen.has(rel)) {
      seen.add(rel);
      links.push(`https://www.kepub.net${rel}`);
    }
  }
  return links;
}

function extractChapterTitle(html) {
  const m = html.match(/id="top_chaptername"[^>]*>([\s\S]*?)<\/span>/i);
  if (!m) return '';
  return stripTags(m[1]);
}

function extractChapterContent(html) {
  const m = html.match(/<div id="content"[^>]*>([\s\S]*?)<\/div>/i);
  if (!m) return '';
  return stripTags(m[1]);
}

async function fetchText(url) {
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 NarrativeOS-Fulltext-Downloader'
    }
  });
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} for ${url}`);
  }
  return res.text();
}

async function main() {
  const raw = await fs.readFile(INPUT_FILE, 'utf8');
  const books = JSON.parse(raw);
  await fs.mkdir(OUTPUT_ROOT, { recursive: true });

  const summary = [];

  for (const book of books) {
    const rank = book.rank;
    const title = book.title;
    const author = book.author;
    const bookUrl = book.kepub_book_url;
    const bookNo = extractBookNo(bookUrl);

    const dirName = `${String(rank).padStart(3, '0')}_${safeName(title)}_${safeName(author)}`;
    const bookDir = path.join(OUTPUT_ROOT, dirName);
    const chapterDir = path.join(bookDir, 'chapters');
    await fs.mkdir(chapterDir, { recursive: true });

    const bookHtml = await fetchText(bookUrl);
    const chapterLinks = extractChapterLinks(bookNo, bookHtml);

    const mergedParts = [];
    let okCount = 0;

    for (let i = 0; i < chapterLinks.length; i += 1) {
      const chapterUrl = chapterLinks[i];
      try {
        const chapterHtml = await fetchText(chapterUrl);
        const chapterTitle = extractChapterTitle(chapterHtml) || `chapter_${i + 1}`;
        const content = extractChapterContent(chapterHtml);
        if (!content) continue;

        const line = `${String(i + 1).padStart(3, '0')}_${safeName(chapterTitle)}.txt`;
        const chapterPath = path.join(chapterDir, line);
        await fs.writeFile(chapterPath, `${chapterTitle}\n\n${content}\n`, 'utf8');

        mergedParts.push(`# ${chapterTitle}\n\n${content}\n`);
        okCount += 1;
      } catch {
        // skip failed chapter
      }
      await sleep(120);
    }

    const mergedPath = path.join(bookDir, 'fulltext.txt');
    await fs.writeFile(
      mergedPath,
      `书名: ${title}\n作者: ${author}\n榜单排名: ${rank}\n来源: ${bookUrl}\n\n${mergedParts.join('\n')}`,
      'utf8'
    );

    await fs.writeFile(
      path.join(bookDir, 'meta.json'),
      JSON.stringify(
        {
          rank,
          title,
          author,
          kepub_book_url: bookUrl,
          kepub_fulltext_url: book.kepub_fulltext_url,
          chapters_discovered: chapterLinks.length,
          chapters_downloaded: okCount
        },
        null,
        2
      ),
      'utf8'
    );

    summary.push({
      rank,
      title,
      author,
      kepub_book_url: bookUrl,
      chapters_discovered: chapterLinks.length,
      chapters_downloaded: okCount,
      local_dir: bookDir,
      local_fulltext: mergedPath
    });

    await sleep(200);
  }

  const summaryPath = path.join(OUTPUT_ROOT, 'download_summary.json');
  await fs.writeFile(summaryPath, JSON.stringify(summary, null, 2), 'utf8');

  const csvHeader = [
    'rank',
    'title',
    'author',
    'kepub_book_url',
    'chapters_discovered',
    'chapters_downloaded',
    'local_dir',
    'local_fulltext'
  ];
  const esc = (v) => {
    const s = String(v ?? '');
    if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
    return s;
  };
  const csv = [
    csvHeader.join(','),
    ...summary.map((row) => csvHeader.map((k) => esc(row[k])).join(','))
  ].join('\n');
  await fs.writeFile(path.join(OUTPUT_ROOT, 'download_summary.csv'), csv, 'utf8');

  console.log(`Downloaded books: ${summary.length}`);
  console.log(`Summary: ${summaryPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
