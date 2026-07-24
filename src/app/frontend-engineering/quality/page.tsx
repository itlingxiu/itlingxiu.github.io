import type { Metadata } from 'next';
import View from '@/views/Engineering/Desktop';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: '桌面构建工具',
  description: 'Electron 桌面应用开发教程。',
  path: '/frontend-engineering/quality',
});

export default function Page() {
  return <View />;
}
