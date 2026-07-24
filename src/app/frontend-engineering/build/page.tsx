import type { Metadata } from 'next';
import View from '@/views/Engineering/Webpack';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'Webpack',
  description: 'Webpack 模块打包与构建优化教程。',
  path: '/frontend-engineering/build',
});

export default function Page() {
  return <View />;
}
