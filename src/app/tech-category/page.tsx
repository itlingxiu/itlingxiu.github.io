import type { Metadata } from 'next';
import View from '@/views/TechCategory';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: '技术分类',
  description: '按类别浏览 Vue、React、Node.js 等技术文档与教程。',
  path: '/tech-category',
});

export default function Page() {
  return <View />;
}
