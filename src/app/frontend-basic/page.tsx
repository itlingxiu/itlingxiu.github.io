import type { Metadata } from 'next';
import View from '@/views/Frontend/Html';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: '前端基础',
  description: 'HTML、CSS、JavaScript 前端基础教程。',
  path: '/frontend-basic',
});

export default function Page() {
  return <View />;
}
