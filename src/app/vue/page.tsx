import type { Metadata } from 'next';
import View from '@/views/VuePages/Basic';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'Vue',
  description: 'Vue 基础与组合式 API 教程。',
  path: '/vue',
});

export default function Page() {
  return <View />;
}
