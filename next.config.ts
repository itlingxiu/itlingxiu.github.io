import type { NextConfig } from 'next';
import path from 'path';

const lessOptions = {
  javascriptEnabled: true,
  modifyVars: {
    '@primary-color': '#1890ff',
    '@border-radius-base': '6px',
  },
};

const nextConfig: NextConfig = {
  reactCompiler: true,
  transpilePackages: ['antd', '@ant-design/icons', '@ant-design/nextjs-registry'],
  images: {
    unoptimized: true,
  },
  turbopack: {
    root: path.join(__dirname),
    rules: {
      '*.less': {
        loaders: [
          {
            loader: 'less-loader',
            options: { lessOptions },
          },
        ],
        as: '*.css',
      },
    },
  },
};

export default nextConfig;
