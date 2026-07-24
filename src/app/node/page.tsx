import type { Metadata } from 'next';
import View from '@/views/NodePages/Express';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'Node.js',
  description: 'Node.js、Express、NestJS 后端开发教程。',
  path: '/node',
});

export default function Page() {
  return <View />;
}
