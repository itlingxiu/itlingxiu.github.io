import fs from 'fs';

const files = [
  'src/components/MusicPlayer/useAudioPlayer.ts',
  'src/components/MusicPlayer/useDraggable.ts',
  'src/components/MusicPlayer/api.ts',
  'src/components/MusicPlayer/index.tsx',
  'src/hooks/useMergedRoadmaps.ts',
  'src/views/AlgorithmHub/solutionLang.ts',
  'src/views/AlgorithmHub/index.tsx',
  'src/services/roadmap/storage.ts',
];

for (const file of files) {
  let text = fs.readFileSync(file, 'utf8');
  if (!text.includes("from '@/lib/safeStorage'")) {
    if (text.startsWith("'use client'")) {
      text = text.replace(
        "'use client';\n\n",
        "'use client';\n\nimport { storageGet, storageSet, storageRemove } from '@/lib/safeStorage';\n",
      );
    } else {
      text = `import { storageGet, storageSet, storageRemove } from '@/lib/safeStorage';\n${text}`;
    }
  }
  text = text.replaceAll('localStorage.getItem', 'storageGet');
  text = text.replaceAll('localStorage.setItem', 'storageSet');
  text = text.replaceAll('localStorage.removeItem', 'storageRemove');
  // Clean up obsolete guards that become dead/incorrect
  text = text.replace(
    /if \(typeof localStorage === 'undefined'\) return defaultState\(\);\n\s*/g,
    '',
  );
  text = text.replace(
    /if \(typeof localStorage === 'undefined'\) return;\n\s*/g,
    '',
  );
  fs.writeFileSync(file, text, 'utf8');
  console.log('patched', file);
}
