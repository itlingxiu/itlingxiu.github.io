import type { Metadata } from 'next';
import View from '@/views/NodePages/Express';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'Express',
  description: 'Express 轻量级 Node.js 框架教程。',
  path: '/node/express',
});

export default function Page() {
  return <View />;
}
