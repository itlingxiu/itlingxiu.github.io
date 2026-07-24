import type { Metadata } from 'next';
import View from '@/views/Products';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: '产品',
  description: '光影博客相关产品与技术服务介绍。',
  path: '/products',
});

export default function Page() {
  return <View />;
}
