/** Public asset base path (Next.js serves `/public` at `/`). */
export const PUBLIC_BASE_URL = '/';

export function publicUrl(assetPath: string): string {
  const cleaned = assetPath.replace(/^\/+/, '');
  return `${PUBLIC_BASE_URL}${cleaned}`;
}
