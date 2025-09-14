'use client';

import { useRouter } from 'next/navigation';
import type React from 'react';
import { useEffect } from 'react';
import * as styles from './Menu.css';

// PageTransition用の型定義
declare global {
  interface Window {
    pageTransitionState?: {
      isTransitioning: boolean;
      overlay: HTMLElement | null;
    };
    navigateWithTransition?: (url: string) => void;
  }
}

interface MenuItem {
  jp: string;
  en: string;
  section: string;
}

const menuItems: MenuItem[] = [
  { jp: '日々とは', en: 'About', section: 'about' },
  { jp: '日々の記録', en: 'Gallery&portfolio', section: 'gallery' },
  { jp: '日々の建築と陶芸', en: 'Case Studies', section: 'works-list' },
  { jp: '日々の詳細', en: 'Profile', section: 'contact' },
];

interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const Menu: React.FC<MenuProps> = ({ isOpen, onClose }) => {
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleNavigation = (section: string) => {
    onClose();

    const currentPath = window.location.pathname;
    const isHomePage = currentPath === '/';
    const isWorksDetailPage = currentPath.startsWith('/works/');

    if (isHomePage) {
      // On home page: scroll directly with smooth behavior
      const sectionElement = document.querySelector(`[data-section="${section}"]`) as HTMLElement;

      if (sectionElement) {
        sectionElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'end',
        });
      }
    } else if (isWorksDetailPage) {
      // On works detail page: use PageTransition with hash navigation
      const targetUrl = `/#${section}`;

      // セクション情報をlocalStorageに保存
      localStorage.setItem('target-section', section);

      // PageTransitionWrapperを使って遷移
      if (window.navigateWithTransition) {
        window.navigateWithTransition(targetUrl);
      } else {
        router.push(targetUrl);
      }
    } else {
      // On other pages: navigate to home page with hash using PageTransitionWrapper
      const targetUrl = `/#${section}`;

      // セクション情報をlocalStorageに保存
      localStorage.setItem('target-section', section);

      // PageTransitionWrapperを使って遷移
      if (window.navigateWithTransition) {
        window.navigateWithTransition(targetUrl);
      } else {
        router.push(targetUrl);
      }
    }
  };

  return (
    <div className={`${styles.menuOverlay} ${isOpen ? styles.menuOverlayOpen : ''}`}>
      {/* Background overlay for closing */}
      <button
        className={`${styles.menuBackdrop} ${isOpen ? styles.menuBackdropOpen : ''}`}
        onClick={onClose}
        tabIndex={-1}
        type="button"
        aria-label="メニューを閉じる"
      />
      {/* Menu content */}
      <div className={`${styles.menuContent} ${isOpen ? styles.menuContentOpen : ''}`}>
        {/* Menu items list */}
        <div className={styles.menuList}>
          {menuItems.map((item, index) => {
            const menuItemClass =
              index === 0
                ? styles.menuItem1
                : index === 1
                  ? styles.menuItem2
                  : index === 2
                    ? styles.menuItem3
                    : index === 3
                      ? styles.menuItem4
                      : styles.menuItem1;

            return (
              <button
                key={item.section}
                className={`${styles.menuItem} ${menuItemClass}`}
                onClick={() => handleNavigation(item.section)}
                tabIndex={isOpen ? 0 : -1}
                type="button"
              >
                <span className={styles.menuItemJp}>{item.jp}</span>
              </button>
            );
          })}
          {/* Instagram 外部リンク */}
          <a
            href="https://www.instagram.com/hibi_atelier"
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.menuItem} ${styles.menuItem5}`}
            tabIndex={isOpen ? 0 : -1}
          >
            <span className={styles.menuItemJp}>日々のインスタ</span>
          </a>
        </div>

        {/* Close button */}
        <div className={styles.menuClose}>
          <button
            className={styles.closeButton}
            onClick={onClose}
            tabIndex={isOpen ? 0 : -1}
            type="button"
          >
            <span className={styles.closeSymbol}>×</span>
            <span className={styles.closeText}>閉じる</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Menu;
