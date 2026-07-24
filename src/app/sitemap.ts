import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

const paths = [
  '/',
  '/about',
  '/blog',
  '/tech-category',
  '/resources',
  '/roadmap',
  '/cooperation',
  '/certificate',
  '/dev-hub',
  '/algorithm',
  '/products',
  '/frontend-basic',
  '/frontend-basic/html',
  '/frontend-basic/css',
  '/frontend-basic/js',
  '/frontend-engineering',
  '/frontend-engineering/build',
  '/frontend-engineering/ci',
  '/frontend-engineering/quality',
  '/react',
  '/react/hooks',
  '/react/state',
  '/react/perf',
  '/vue',
  '/vue/basic',
  '/vue/pinia',
  '/vue/router',
  '/node',
  '/node/express',
  '/node/nest',
  '/node/practice',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return paths.map((path) => ({
    url: `${SITE_URL}${path === '/' ? '' : path}`,
    lastModified: now,
    changeFrequency: path === '/' ? 'daily' : 'weekly',
    priority: path === '/' ? 1 : path === '/dev-hub' || path === '/algorithm' ? 0.9 : 0.7,
  }));
}
