import type { Metadata } from 'next';
import View from '@/views/About';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: '关于',
  description: '关于光影博客与联系方式，了解全栈技术分享与服务内容。',
  path: '/about',
});

export default function Page() {
  return <View />;
}
