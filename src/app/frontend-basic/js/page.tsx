import type { Metadata } from 'next';
import View from '@/views/Frontend/JavaScript';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'JavaScript',
  description: 'JavaScript 核心语法与高级特性教程。',
  path: '/frontend-basic/js',
});

export default function Page() {
  return <View />;
}
