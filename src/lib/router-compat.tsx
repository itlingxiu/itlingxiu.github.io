'use client';

import NextLink from 'next/link';
import {
  usePathname,
  useRouter,
  useSearchParams as useNextSearchParams,
} from 'next/navigation';
import {
  forwardRef,
  type AnchorHTMLAttributes,
  type MouseEvent,
  type ReactNode,
} from 'react';

type NavigateOptions = {
  replace?: boolean;
  state?: unknown;
};

export function useLocation() {
  const pathname = usePathname() || '/';
  return {
    pathname,
    search: typeof window !== 'undefined' ? window.location.search : '',
    hash: typeof window !== 'undefined' ? window.location.hash : '',
    state: null,
    key: 'default',
  };
}

export function useNavigate() {
  const router = useRouter();

  return (to: string | number, options?: NavigateOptions) => {
    if (typeof to === 'number') {
      if (to < 0) router.back();
      else if (to > 0) router.forward();
      return;
    }
    if (options?.replace) router.replace(to);
    else router.push(to);
  };
}

export function useSearchParams(): [
  URLSearchParams,
  (next: URLSearchParams | Record<string, string>) => void,
] {
  const searchParams = useNextSearchParams();
  const router = useRouter();
  const pathname = usePathname() || '/';

  const setSearchParams = (
    next: URLSearchParams | Record<string, string>,
  ) => {
    const params =
      next instanceof URLSearchParams
        ? next
        : new URLSearchParams(next);
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
  };

  return [new URLSearchParams(searchParams.toString()), setSearchParams];
}

type CompatLinkProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  'href'
> & {
  to: string;
  children?: ReactNode;
  replace?: boolean;
};

export const Link = forwardRef<HTMLAnchorElement, CompatLinkProps>(
  function CompatLink({ to, children, replace, onClick, ...rest }, ref) {
    return (
      <NextLink
        ref={ref}
        href={to}
        replace={replace}
        onClick={onClick as ((e: MouseEvent<HTMLAnchorElement>) => void) | undefined}
        {...rest}
      >
        {children}
      </NextLink>
    );
  },
);
