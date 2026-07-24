import type { Metadata, Viewport } from 'next';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import AppShell from '@/components/AppShell';
import {
  buildOrganizationJsonLd,
  buildPageMetadata,
  buildWebsiteJsonLd,
} from '@/lib/seo';
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/site';
import '@/index.css';

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: '首页',
    description: SITE_DESCRIPTION,
    path: '/',
  }),
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  icons: {
    icon: '/images/logo.jpg',
    apple: '/images/logo.jpg',
  },
  manifest: '/manifest.webmanifest',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#6366f1',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const websiteLd = buildWebsiteJsonLd();
  const orgLd = buildOrganizationJsonLd();

  return (
    <html lang="zh-CN">
      <head>
        <link
          rel="alternate"
          type="text/plain"
          href="/llms.txt"
          title="LLM instructions"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }}
        />
      </head>
      <body>
        <AntdRegistry>
          <AppShell>{children}</AppShell>
        </AntdRegistry>
      </body>
    </html>
  );
}
