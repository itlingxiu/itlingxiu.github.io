import React, { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './index.less';

interface SocialLink {
  id: string;
  label: string;
  icon: string;
  href?: string;
  type: 'link' | 'popup';
  popupImage?: string;
  popupText?: string;
}

const socialLinks: SocialLink[] = [
  {
    id: 'juejin',
    label: '掘金',
    icon: '/images/social/juejin.svg',
    href: 'https://juejin.cn/user/3184663905962126?share_token=b70f2a00-f1da-4970-b36c-0ae8249ec043',
    type: 'link',
  },
  {
    id: 'xiaohongshu',
    label: '小红书',
    icon: '/images/social/xiaohongshu.svg',
    href: 'https://xhslink.com/m/99pZf6KnRoV',
    type: 'link',
  },
  {
    id: 'zhihu',
    label: '知乎',
    icon: '/images/social/zhihu.svg',
    href: 'https://www.zhihu.com/people/guang-ying-shao-nian-47',
    type: 'link',
  },
  {
    id: 'wechat',
    label: '微信联系方式',
    icon: '/images/social/wechat.svg',
    type: 'popup',
    popupImage: '/images/vx.png',
    popupText: '扫码添加微信',
  },
  {
    id: 'channels',
    label: '视频号',
    icon: '/images/social/shipi-icon.svg',
    type: 'popup',
    popupImage: '/images/social/vxsp.jpg',
    popupText: '扫码关注视频号',
  },
  {
    id: 'official',
    label: '公众号',
    icon: '/images/social/wx.svg',
    type: 'popup',
    popupImage: '/images/vx.jpg',
    popupText: '扫码关注公众号',
  },
  {
    id: 'csdn',
    label: 'CSDN',
    icon: '/images/social/csdn.svg',
    href: 'https://blog.csdn.net/qq_25416827?spm=1000.2115.3001.5343',
    type: 'link',
  },
];

const SocialSidebar: React.FC = () => {
  const location = useLocation();
  const [openPopupId, setOpenPopupId] = useState<string | null>(null);
  const isHomePage = location.pathname === '/';

  const closePopup = useCallback(() => setOpenPopupId(null), []);

  const togglePopup = (id: string) => {
    setOpenPopupId((prev) => (prev === id ? null : id));
  };

  const activePopup = socialLinks.find((item) => item.id === openPopupId && item.type === 'popup');

  useEffect(() => {
    closePopup();
  }, [location.pathname, closePopup]);

  useEffect(() => {
    if (!openPopupId) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closePopup();
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [openPopupId, closePopup]);

  const renderIcon = (icon: string) => (
    <span className="social-sidebar-icon">
      <img src={icon} alt="" aria-hidden="true" />
    </span>
  );

  if (!isHomePage) {
    return null;
  }

  return (
    <>
      <aside className="social-sidebar" aria-label="社交媒体导航">
        <nav className="social-sidebar-nav">
          {socialLinks.map((item) =>
            item.type === 'link' ? (
              <a
                key={item.id}
                className="social-sidebar-item"
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.label}
                title={item.label}
              >
                {renderIcon(item.icon)}
              </a>
            ) : (
              <button
                key={item.id}
                type="button"
                className={`social-sidebar-item ${openPopupId === item.id ? 'active' : ''}`}
                aria-label={item.label}
                aria-expanded={openPopupId === item.id}
                title={item.label}
                onClick={() => togglePopup(item.id)}
              >
                {renderIcon(item.icon)}
              </button>
            ),
          )}
        </nav>
      </aside>

      {activePopup?.popupImage && (
        <div
          className="social-sidebar-modal-overlay"
          role="presentation"
          onClick={closePopup}
        >
          <div
            className="social-sidebar-modal"
            role="dialog"
            aria-label={activePopup.label}
            aria-modal="true"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="social-sidebar-modal-close"
              aria-label="关闭"
              onClick={closePopup}
            >
              ×
            </button>
            <img src={activePopup.popupImage} alt={`${activePopup.label}二维码`} />
            {activePopup.popupText && <p>{activePopup.popupText}</p>}
          </div>
        </div>
      )}
    </>
  );
};

export default SocialSidebar;
