import type { Metadata } from 'next';
import { Suspense } from 'react';
import View from '@/views/DevHub';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: '面试题',
  description: '前端后端技术面试题题库，覆盖 JavaScript、React、Vue、Java、Go 等。',
  path: '/dev-hub',
});

export default function Page() {
  return (
    <Suspense fallback={<div style={{ padding: 24 }}>加载中...</div>}>
      <View />
    </Suspense>
  );
}
