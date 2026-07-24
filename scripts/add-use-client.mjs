import fs from 'fs';
import path from 'path';

function walk(dir, out = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      if (ent.name === 'solutions' || ent.name === '__tests__') continue;
      walk(p, out);
    } else if (/\.(tsx|ts)$/.test(ent.name)) {
      out.push(p);
    }
  }
  return out;
}

const roots = ['src/components', 'src/views', 'src/hooks', 'src/data'];
let count = 0;

for (const root of roots) {
  if (!fs.existsSync(root)) continue;
  for (const file of walk(root)) {
    let content = fs.readFileSync(file, 'utf8');
    if (/^['"]use client['"]/.test(content.trimStart())) continue;
    content = "'use client';\n\n" + content;
    fs.writeFileSync(file, content);
    count += 1;
    console.log('added', file);
  }
}

console.log('total', count);
