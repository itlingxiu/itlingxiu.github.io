import type { Metadata } from 'next';
import View from '@/views/Frontend/Css';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'CSS',
  description: '样式布局与动画效果教程。',
  path: '/frontend-basic/css',
});

export default function Page() {
  return <View />;
}
