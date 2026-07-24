import type { Metadata } from 'next';
import View from '@/views/Blog';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: '博客文章',
  description: '技术文章与学习笔记，覆盖前端、后端与全栈开发实践。',
  path: '/blog',
});

export default function Page() {
  return <View />;
}
