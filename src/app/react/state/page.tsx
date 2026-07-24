import type { Metadata } from 'next';
import View from '@/views/ReactPages/State';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'React 状态管理',
  description: 'React 状态管理方案与实践。',
  path: '/react/state',
});

export default function Page() {
  return <View />;
}
