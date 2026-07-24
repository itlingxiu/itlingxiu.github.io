import type { Metadata } from 'next';
import View from '@/views/Resources';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: '资源导航',
  description: '精选开发工具、文档与学习资源导航。',
  path: '/resources',
});

export default function Page() {
  return <View />;
}
