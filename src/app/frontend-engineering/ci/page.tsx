import type { Metadata } from 'next';
import View from '@/views/Engineering/Vite';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'Vite',
  description: 'Vite 极速开发构建工具教程。',
  path: '/frontend-engineering/ci',
});

export default function Page() {
  return <View />;
}
