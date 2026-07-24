import type { Metadata } from 'next';
import View from '@/views/Home';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: '首页',
  description: '探索技术之美，分享编程智慧。全栈开发技术分享、面试题与算法资源。',
  path: '/',
});

export default function Page() {
  return <View />;
}
