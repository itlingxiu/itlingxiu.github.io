import type { Metadata } from 'next';
import View from '@/views/Certificate';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: '证书办理',
  description: '专业技术认证与证书办理服务介绍。',
  path: '/certificate',
});

export default function Page() {
  return <View />;
}
