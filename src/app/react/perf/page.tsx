import type { Metadata } from 'next';
import View from '@/views/ReactPages/Performance';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'React 性能优化',
  description: 'React 性能优化技巧与实践。',
  path: '/react/perf',
});

export default function Page() {
  return <View />;
}
