'use client';

import Image from 'next/image';
import type React from 'react';
import * as common from '../../styles/common.css';
import * as styles from './Footer.css';

interface FooterProps {
  topSection: string;
  isTopPage?: boolean;
}

export const Footer: React.FC<FooterProps> = ({ topSection, isTopPage = false }) => {
  const currentYear = new Date().getFullYear();

  const handleBackToTop = () => {
    const section = document.querySelector(`[data-section="${topSection}"]`) as HTMLElement;

    if (section) {
      section.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'end',
      });
    }
  };

  const handleLogoClick = () => {
    // heroセクションにスムーススクロール
    const heroSection = document.querySelector('[data-section="hero"]') as HTMLElement;
    if (heroSection) {
      heroSection.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'end',
      });
    }
  };

  return (
    <footer className={styles.footer} data-section="footer">
      <div className={styles.footerContent}>
        <div className={styles.logoSection}>
          <div className={styles.logo}>
            {isTopPage ? (
              <button onClick={handleLogoClick} type="button" className={styles.logoButton}>
                <Image src="/hibi-logo-white.svg" alt="日々" width={120} height={120} />
              </button>
            ) : (
              <a href="/">
                <Image src="/hibi-logo-white.svg" alt="日々" width={120} height={120} />
              </a>
            )}
          </div>
          <button
            className={`${styles.backToTop} ${common.verticalTextJp}`}
            onClick={handleBackToTop}
            type="button"
          >
            先頭に戻る<span className={styles.arrowHorizontal}>→</span>
          </button>
        </div>
      </div>
      <div className={styles.copyright}>© {currentYear} Hibi.</div>
    </footer>
  );
};
