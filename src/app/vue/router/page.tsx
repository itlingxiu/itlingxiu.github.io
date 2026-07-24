import type { Metadata } from 'next';
import View from '@/views/VuePages/Router';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'Vue Router',
  description: 'Vue Router 官方路由教程。',
  path: '/vue/router',
});

export default function Page() {
  return <View />;
}
