import type { Metadata } from 'next';
import View from '@/views/NodePages/Practice';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'Node 实践',
  description: 'Node.js 项目实战与最佳实践。',
  path: '/node/practice',
});

export default function Page() {
  return <View />;
}
