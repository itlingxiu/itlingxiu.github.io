import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const srcRoot = path.resolve(root, '..', 'itlingxiu.github.io', 'src');
const dstRoot = path.resolve(root, 'src');

function copyDir(from, to) {
  fs.mkdirSync(to, { recursive: true });
  for (const ent of fs.readdirSync(from, { withFileTypes: true })) {
    const s = path.join(from, ent.name);
    const d = path.join(to, ent.name);
    if (ent.isDirectory()) copyDir(s, d);
    else fs.copyFileSync(s, d);
  }
}

function walk(dir, out = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      if (ent.name === 'node_modules' || ent.name === '.git') continue;
      walk(p, out);
    } else out.push(p);
  }
  return out;
}

// 1) Recopy source trees as binary-safe copies
const map = [
  ['components', 'components'],
  ['data', 'data'],
  ['hooks', 'hooks'],
  ['services', 'services'],
  ['styles', 'styles'],
  ['utils', 'utils'],
  ['pages', 'views'],
];

for (const [fromName, toName] of map) {
  const from = path.join(srcRoot, fromName);
  const to = path.join(dstRoot, toName);
  fs.rmSync(to, { recursive: true, force: true });
  copyDir(from, to);
  console.log('copied', fromName, '->', toName);
}

fs.copyFileSync(path.join(srcRoot, 'index.css'), path.join(dstRoot, 'index.css'));
fs.copyFileSync(path.join(srcRoot, 'App.css'), path.join(dstRoot, 'App.css'));

// 2) Replace react-router-dom imports
const replaceRoots = ['components', 'views'].map((n) => path.join(dstRoot, n));
let replaced = 0;
for (const base of replaceRoots) {
  for (const file of walk(base)) {
    if (!/\.(tsx|ts)$/.test(file)) continue;
    let text = fs.readFileSync(file, 'utf8');
    if (!text.includes('react-router-dom')) continue;
    text = text.replaceAll("from 'react-router-dom'", "from '@/lib/router-compat'");
    text = text.replaceAll('from "react-router-dom"', "from '@/lib/router-compat'");
    fs.writeFileSync(file, text, 'utf8');
    replaced += 1;
    console.log('router', path.relative(root, file));
  }
}

// 3) Add use client (preserve utf8)
const clientRoots = ['components', 'views', 'hooks', 'data'].map((n) =>
  path.join(dstRoot, n),
);
let cliented = 0;
for (const base of clientRoots) {
  for (const file of walk(base)) {
    if (!/\.(tsx|ts)$/.test(file)) continue;
    if (file.includes(`${path.sep}solutions${path.sep}`)) continue;
    if (file.includes(`${path.sep}__tests__${path.sep}`)) continue;
    let text = fs.readFileSync(file, 'utf8');
    if (/^['"]use client['"]/.test(text.trimStart())) continue;
    text = `'use client';\n\n${text}`;
    fs.writeFileSync(file, text, 'utf8');
    cliented += 1;
  }
}

console.log({ replaced, cliented });

// sanity check chinese
const header = fs.readFileSync(path.join(dstRoot, 'components/Header/index.tsx'), 'utf8');
console.log('header has 技术分类:', header.includes('技术分类'));
