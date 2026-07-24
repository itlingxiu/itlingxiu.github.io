import type { Metadata } from 'next';
import View from '@/views/VuePages/Basic';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'Vue 基础',
  description: 'Vue 基础入门与核心概念。',
  path: '/vue/basic',
});

export default function Page() {
  return <View />;
}
