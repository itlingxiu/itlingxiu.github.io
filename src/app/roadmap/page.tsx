import type { Metadata } from 'next';
import View from '@/views/Roadmap';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: '学习路线',
  description: '前端、后端与全栈学习路线图，帮助系统化提升技术能力。',
  path: '/roadmap',
});

export default function Page() {
  return <View />;
}
