'use client';

import React, { useState } from 'react';
import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs';
import { useServerInsertedHTML } from 'next/navigation';

/**
 * 本地 Antd 样式注册：避免 Turbopack 对 @ant-design/nextjs-registry
 * 的 React Client Manifest 解析失败。
 */
export default function AntdRegistry({ children }: React.PropsWithChildren) {
  const [cache] = useState(() => createCache());

  useServerInsertedHTML(() => {
    const styleText = extractStyle(cache, {
      plain: true,
      once: true,
    });

    if (styleText.includes('.data-ant-cssinjs-cache-path{content:"";}')) {
      return null;
    }

    return (
      <style
        id="antd-cssinjs"
        data-rc-order="prepend"
        data-rc-priority="-1000"
        dangerouslySetInnerHTML={{ __html: styleText }}
      />
    );
  });

  return <StyleProvider cache={cache}>{children}</StyleProvider>;
}
