import type { Metadata } from 'next';
import View from '@/views/ReactPages/Hooks';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'React Hooks',
  description: 'React Hooks 用法与最佳实践。',
  path: '/react/hooks',
});

export default function Page() {
  return <View />;
}
