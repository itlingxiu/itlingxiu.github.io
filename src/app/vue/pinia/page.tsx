import type { Metadata } from 'next';
import View from '@/views/VuePages/Pinia';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'Pinia',
  description: 'Vue 状态管理库 Pinia 教程。',
  path: '/vue/pinia',
});

export default function Page() {
  return <View />;
}
