'use client';

import type { ReactNode } from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import Header from '@/components/Header';
import MobileNav from '@/components/MobileNav';
import SocialSidebar from '@/components/SocialSidebar';
import Layout from '@/components/Layout';
import MusicPlayer from '@/components/MusicPlayer';
import '@/App.css';

export default function AppShell({ children }: { children: ReactNode }) {
  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        token: {
          colorPrimary: '#6366f1',
          borderRadius: 6,
        },
      }}
    >
      <div className="App">
        <Header />
        <SocialSidebar />
        <Layout>{children}</Layout>
        <MobileNav />
        <MusicPlayer />
      </div>
    </ConfigProvider>
  );
}
