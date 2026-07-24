import fs from 'fs';

const files = [
  'src/components/MusicPlayer/useAudioPlayer.ts',
  'src/components/MusicPlayer/useDraggable.ts',
  'src/components/MusicPlayer/api.ts',
  'src/components/MusicPlayer/index.tsx',
  'src/hooks/useMergedRoadmaps.ts',
  'src/views/AlgorithmHub/solutionLang.ts',
];

const importLine = "import { storageGet, storageSet, storageRemove } from '@/lib/safeStorage';";

for (const file of files) {
  let text = fs.readFileSync(file, 'utf8');
  if (!text.includes("from '@/lib/safeStorage'")) {
    if (text.startsWith("'use client';")) {
      text = text.replace("'use client';", `'use client';\n${importLine}`);
    } else {
      text = `${importLine}\n${text}`;
    }
  }
  fs.writeFileSync(file, text, 'utf8');
  console.log('import-fixed', file);
}
