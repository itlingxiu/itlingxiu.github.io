import type { Metadata } from 'next';
import View from '@/views/Frontend/Html';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'HTML',
  description: 'Web 页面结构与语义化标签教程。',
  path: '/frontend-basic/html',
});

export default function Page() {
  return <View />;
}
