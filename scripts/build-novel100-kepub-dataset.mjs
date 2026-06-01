#!/usr/bin/env node

import fs from 'node:fs/promises';

const records = [
  [1, '呐喊', '鲁迅'],
  [2, '边城', '沈从文'],
  [3, '骆驼祥子', '老舍'],
  [4, '传奇', '张爱玲'],
  [5, '围城', '钱锺书'],
  [6, '子夜', '茅盾'],
  [7, '台北人', '白先勇'],
  [8, '家', '巴金'],
  [9, '呼兰河传', '萧红'],
  [10, '老残游记', '刘鹗'],
  [11, '寒夜', '巴金'],
  [12, '彷徨', '鲁迅'],
  [13, '官场现形记', '李伯元'],
  [14, '财主底儿女们', '路翎'],
  [15, '将军族', '陈映真'],
  [16, '沉沦', '郁达夫'],
  [17, '死水微澜', '李劼人'],
  [18, '红高粱', '莫言'],
  [19, '小二黑结婚', '赵树理'],
  [20, '棋王', '锺阿城'],
  [21, '家变', '王文兴'],
  [22, '马桥词典', '韩少功'],
  [23, '亚细亚的孤儿', '吴浊流'],
  [24, '半生缘', '张爱玲'],
  [25, '四世同堂', '老舍'],
  [26, '胡雪岩', '高阳'],
  [27, '啼笑因缘', '张恨水'],
  [28, '儿子的大玩偶', '黄春明'],
  [29, '射雕英雄传', '金庸'],
  [30, '莎菲女士的日记', '丁玲'],
  [31, '鹿鼎记', '金庸'],
  [32, '孽海花', '曾朴'],
  [33, '惹事', '赖和'],
  [34, '嫁妆一牛车', '王祯和'],
  [35, '异域', '柏杨'],
  [36, '曾国藩', '唐浩明'],
  [37, '原乡人', '锺理和'],
  [38, '白鹿原', '陈忠实'],
  [39, '长恨歌', '王安忆'],
  [40, '吉陵春秋', '李永平'],
  [41, '黄祸', '王力雄'],
  [42, '狂风沙', '司马中原'],
  [43, '艳阳天', '浩然'],
  [44, '公墓', '穆时英'],
  [45, '旧址', '李锐'],
  [46, '星星·月亮·太阳', '徐速'],
  [47, '台湾人三部曲', '锺肇政'],
  [48, '洗澡', '杨绛'],
  [49, '旋风', '姜贵'],
  [50, '荷花淀', '孙犁'],
  [51, '我城', '西西'],
  [52, '受戒', '汪曾祺'],
  [53, '铁浆', '朱西甯'],
  [54, '世纪末的华丽', '朱天文'],
  [55, '蜀山剑侠传', '还珠楼主'],
  [56, '又见棕榈，又见棕榈', '于梨华'],
  [57, '浮躁', '贾平凹'],
  [58, '组织部新来的年轻人', '王蒙'],
  [59, '玉梨魂', '徐枕亚'],
  [60, '香港三部曲', '施叔青'],
  [61, '京华烟云', '林语堂'],
  [62, '倪焕之', '叶圣陶'],
  [63, '春桃', '许地山'],
  [64, '桑青与桃红', '聂华苓'],
  [65, '蓝与黑', '王蓝'],
  [66, '二月', '柔石'],
  [67, '风萧萧', '徐𬣙'],
  [68, '芙蓉镇', '古华'],
  [69, '地之子', '台静农'],
  [70, '城南旧事', '林海音'],
  [71, '古船', '张炜'],
  [72, '酒徒', '刘以鬯'],
  [73, '未央歌', '鹿桥'],
  [74, '沉重的翅膀', '张洁'],
  [75, '果园城记', '师陀'],
  [76, '人啊，人！', '戴厚英'],
  [77, '黄金时代', '王小波'],
  [78, '狗日的粮食', '刘恒'],
  [79, '棋王', '张系国'],
  [80, '赖索', '黄凡'],
  [81, '妻妾成群', '苏童'],
  [82, '霸王别姬', '李碧华'],
  [83, '杀夫', '李昂'],
  [84, '楚留香', '古龙'],
  [85, '窗外', '琼瑶'],
  [86, '沉默之岛', '苏伟贞'],
  [87, '白发魔女传', '梁羽生'],
  [88, '古都', '朱天心'],
  [89, '尹县长', '陈若曦'],
  [90, '四喜忧国', '张大春'],
  [91, '喜宝', '亦舒'],
  [92, '男人的一半是女人', '张贤亮'],
  [93, '将军底头', '施蛰存'],
  [94, '蓝血人', '倪匡'],
  [95, '二十年目睹之怪现状', '吴趼人'],
  [96, '活着', '余华'],
  [97, '冈底斯的诱惑', '马原'],
  [98, '十年十意', '林斤澜'],
  [99, '北极风情画', '无名氏'],
  [100, '雍正皇帝', '二月河']
].map(([rank, title, author]) => ({ rank, title, author }));

const normalize = (s) =>
  (s || '')
    .toLowerCase()
    .replace(/[鍾锺]/g, '钟')
    .replace(/[臺台]/g, '台')
    .replace(/[裏裡]/g, '里')
    .replace(/[與与]/g, '与')
    .replace(/[\s\u3000《》“”"'‘’·,，。！!？?：:；;（）()\[\]【】]/g, '');

const stripPunc = (s) => (s || '').replace(/[《》“”"'‘’·,，。！!？?：:；;（）()\[\]【】\s\u3000]/g, '');

const escCsv = (v) => {
  const s = String(v ?? '');
  if (s.includes('"') || s.includes(',') || s.includes('\n')) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
};

async function queryKepub(keyword, maxPages = 10) {
  const merged = [];
  for (let page = 1; page <= maxPages; page += 1) {
    const url = `https://www.kepub.net/queryBookByPage?page=${page}&keyword=${encodeURIComponent(keyword)}`;
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 NarrativeOS-Dataset-Builder'
      }
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const payload = await res.json();
    const list = Array.isArray(payload?.data) ? payload.data : [];
    if (list.length === 0) break;
    merged.push(...list);
    if (list.length < 10) break;
  }
  return { data: merged };
}

async function queryKepubByRecord(record) {
  const candidates = [
    record.title,
    stripPunc(record.title),
    `${record.title} ${record.author}`,
    `${record.author} ${record.title}`,
    record.author
  ];
  const seenKw = new Set();
  const all = [];
  for (const kw of candidates) {
    const keyword = kw.trim();
    if (!keyword || seenKw.has(keyword)) continue;
    seenKw.add(keyword);
    const payload = await queryKepub(keyword, 8);
    for (const item of payload.data || []) {
      const key = `${item.bookNo}`;
      if (!all.some((x) => `${x.bookNo}` === key)) all.push(item);
    }
    await new Promise((r) => setTimeout(r, 80));
  }
  return { data: all };
}

async function fetchStartReadUrl(bookUrl) {
  try {
    const res = await fetch(bookUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 NarrativeOS-Dataset-Builder'
      }
    });
    if (!res.ok) return '';
    const html = await res.text();
    const m = html.match(/class="btn read-btn"[^>]*>\s*<a href="([^"]+)"/i);
    if (!m) return '';
    const href = m[1];
    if (href.startsWith('http')) return href;
    return `https://www.kepub.net${href}`;
  } catch {
    return '';
  }
}

function pickBestMatch(target, payload) {
  const list = payload?.data || [];
  if (!Array.isArray(list) || list.length === 0) return null;

  const targetTitleNorm = normalize(target.title);
  const targetAuthorNorm = normalize(target.author);

  const scored = list.map((item) => {
    const title = item.bookName || '';
    const author = item.authorName || '';
    const titleNorm = normalize(title);
    const authorNorm = normalize(author);

    let score = 0;
    if (titleNorm === targetTitleNorm) score += 80;
    // 对于非精确标题，仅在作者也精确一致时允许弱匹配，降低误命中概率。
    else if (
      targetTitleNorm.length >= 4 &&
      (titleNorm.includes(targetTitleNorm) || targetTitleNorm.includes(titleNorm)) &&
      authorNorm &&
      targetAuthorNorm &&
      authorNorm === targetAuthorNorm
    ) {
      score += 45;
    }

    if (authorNorm && targetAuthorNorm && authorNorm === targetAuthorNorm) score += 20;
    else if (authorNorm && targetAuthorNorm && (authorNorm.includes(targetAuthorNorm) || targetAuthorNorm.includes(authorNorm))) score += 10;
    else if (titleNorm === targetTitleNorm && targetAuthorNorm) score -= 50;

    if (item.isPublic === 1) score += 5;

    return {
      score,
      bookNo: item.bookNo,
      bookName: title,
      authorName: author,
      bookUrl: item.bookFilePath ? `https://www.kepub.net${item.bookFilePath}` : '',
      raw: item
    };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored[0];
}

async function main() {
  const rows = [];

  for (const record of records) {
    try {
      const payload = await queryKepubByRecord(record);
      const best = pickBestMatch(record, payload);

      if (!best || best.score < 100) {
        rows.push({
          ...record,
          kepub_book_no: '',
          kepub_book_name: '',
          kepub_author: '',
          kepub_book_url: '',
          match_score: best ? best.score : 0,
          match_status: 'no_match'
        });
      } else {
        const fulltextUrl = await fetchStartReadUrl(best.bookUrl);
        rows.push({
          ...record,
          kepub_book_no: best.bookNo,
          kepub_book_name: best.bookName,
          kepub_author: best.authorName,
          kepub_book_url: best.bookUrl,
          kepub_fulltext_url: fulltextUrl,
          match_score: best.score,
          match_status: 'matched'
        });
      }
    } catch (err) {
      rows.push({
        ...record,
        kepub_book_no: '',
        kepub_book_name: '',
        kepub_author: '',
        kepub_book_url: '',
        kepub_fulltext_url: '',
        match_score: 0,
        match_status: `error:${err.message}`
      });
    }

    await new Promise((r) => setTimeout(r, 120));
  }

  const header = [
    'rank',
    'title',
    'author',
    'kepub_book_no',
    'kepub_book_name',
    'kepub_author',
    'kepub_book_url',
    'kepub_fulltext_url',
    'match_score',
    'match_status'
  ];

  const csv = [
    header.join(','),
    ...rows.map((row) => header.map((k) => escCsv(row[k])).join(','))
  ].join('\n');

  await fs.writeFile('assets/datasets/novel100_kepub.csv', csv, 'utf8');
  await fs.writeFile('assets/datasets/novel100_kepub.json', JSON.stringify(rows, null, 2), 'utf8');

  const matched = rows.filter((r) => r.match_status === 'matched').length;
  console.log(`Generated dataset: ${rows.length} rows, matched: ${matched}, no_match_or_error: ${rows.length - matched}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
