import type { Metadata } from 'next';
import View from '@/views/Cooperation';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: '资源合作',
  description: '技术交流与资源合作，共赢共创。',
  path: '/cooperation',
});

export default function Page() {
  return <View />;
}
