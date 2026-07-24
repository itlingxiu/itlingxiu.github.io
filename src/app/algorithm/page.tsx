import type { Metadata } from 'next';
import View from '@/views/AlgorithmHub';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: '算法题',
  description: '算法题与题解整合，含 LeetCode 与剑指 Offer 等多语言题解。',
  path: '/algorithm',
});

export default function Page() {
  return <View />;
}
