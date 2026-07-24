import type { Metadata } from 'next';
import View from '@/views/Engineering/Webpack';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: '前端工程化',
  description: 'Webpack、Vite、Electron 等前端工程化工具教程。',
  path: '/frontend-engineering',
});

export default function Page() {
  return <View />;
}
