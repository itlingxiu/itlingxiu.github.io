export function stripHtml(html) {
  if (!html) return '';
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<iframe[\s\S]*?<\/iframe>/gi, '\n[代码演示见力扣官网]\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<\/li>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/\$\$([^$]+)\$\$/g, '$1')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

const FENCE_LANG = {
  javascript: 'javascript',
  typescript: 'typescript',
  python: 'python',
  python3: 'python',
  java: 'java',
  cpp: 'cpp',
  'c++': 'cpp',
  c: 'cpp',
  go: 'go',
  golang: 'go',
};

function mapFenceLang(raw) {
  const token = raw.trim().toLowerCase();
  const base = token.split(/\s+/)[0].replace(/\[.*$/, '');
  if (FENCE_LANG[base]) return FENCE_LANG[base];
  const m = token.match(/sol\d+-(\w+)/i);
  if (m) return mapFenceLang(m[1]);
  return FENCE_LANG[token] ?? null;
}

export function extractCodeSolutions(text) {
  if (!text) return {};
  const out = {};
  const re = /```([^\n`]+)\n([\s\S]*?)```/g;
  let m;
  while ((m = re.exec(text)) !== null) {
    const lang = mapFenceLang(m[1]);
    const code = m[2].trim();
    if (!lang || code.length < 8) continue;
    if (!out[lang] || code.length > out[lang].length) out[lang] = code;
  }
  return out;
}
