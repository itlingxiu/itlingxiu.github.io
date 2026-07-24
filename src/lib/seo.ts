import type { Metadata } from 'next';
import {
  SITE_AUTHOR,
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_NAME,
  SITE_URL,
} from '@/lib/site';

type PageMetaInput = {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
};

export function buildPageMetadata({
  title,
  description,
  path = '/',
  keywords = [],
}: PageMetaInput): Metadata {
  const url = new URL(path, SITE_URL).toString();
  const fullTitle = title === '首页' ? `${SITE_NAME} - 全栈开发技术分享 | 技术面试题 算法题整合资源` : `${title} | ${SITE_NAME}`;

  return {
    title: fullTitle,
    description,
    keywords: [...SITE_KEYWORDS, ...keywords],
    authors: [{ name: SITE_AUTHOR }],
    creator: SITE_AUTHOR,
    publisher: SITE_NAME,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    alternates: {
      canonical: url,
      languages: {
        'zh-CN': url,
      },
    },
    openGraph: {
      type: 'website',
      locale: 'zh_CN',
      url,
      siteName: SITE_NAME,
      title: fullTitle,
      description,
      images: [
        {
          url: `${SITE_URL}/images/logo.jpg`,
          width: 512,
          height: 512,
          alt: SITE_NAME,
        },
      ],
    },
    twitter: {
      card: 'summary',
      title: fullTitle,
      description,
      images: [`${SITE_URL}/images/logo.jpg`],
    },
    category: 'technology',
  };
}

export function buildWebsiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    inLanguage: 'zh-CN',
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/images/logo.jpg`,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/dev-hub?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

export function buildOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.jpg`,
    description: SITE_DESCRIPTION,
    sameAs: [],
  };
}
