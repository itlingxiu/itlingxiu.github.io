import type { Metadata } from 'next';
import View from '@/views/ReactPages/Hooks';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'React',
  description: 'React 组件、Hooks 与生态教程。',
  path: '/react',
});

export default function Page() {
  return <View />;
}
