import type { Metadata } from 'next';
import View from '@/views/NodePages/Nest';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'NestJS',
  description: 'NestJS 企业级 Node.js 框架教程。',
  path: '/node/nest',
});

export default function Page() {
  return <View />;
}
