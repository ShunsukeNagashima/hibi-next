'use client';

import { type ReactNode, useEffect, useRef, useState } from 'react';
import { CurrentDate } from '@/components/CurrentDate';
import { NavigationWrapper } from '@/components/Menu';
import { SeasonDisplay } from '@/components/SeasonDisplay';
import * as styles from './PageLayout.css';

interface PageLayoutProps {
  children: ReactNode;
  showFixedMenu?: boolean;
  enableAnimation?: boolean;
}

export function PageLayout({
  children,
  showFixedMenu: externalShowFixedMenu,
  enableAnimation = false,
}: PageLayoutProps) {
  const scrollContainerRef = useRef<HTMLElement>(null);
  const fixedMenuRef = useRef<HTMLDivElement>(null);
  const [internalShowFixedMenu, setInternalShowFixedMenu] = useState(false);

  const shouldShowFixedMenu =
    externalShowFixedMenu !== undefined ? externalShowFixedMenu : internalShowFixedMenu;

  useEffect(() => {
    // externalShowFixedMenuが指定されていない場合のみ自動制御
    if (externalShowFixedMenu === undefined) {
      if (enableAnimation) {
        // ホームページ：アニメーション制御を使用（初期は非表示）
        setInternalShowFixedMenu(false);
      } else {
        // 他のページ：即座に表示
        setInternalShowFixedMenu(true);
      }
    }
  }, [externalShowFixedMenu, enableAnimation]);

  // アニメーション完了時にメニューを表示
  useEffect(() => {
    if (enableAnimation) {
      const handleAnimationComplete = () => {
        setInternalShowFixedMenu(true);
      };

      // カスタムイベントでメニュー表示を受信
      window.addEventListener('showFixedMenu', handleAnimationComplete);

      return () => {
        window.removeEventListener('showFixedMenu', handleAnimationComplete);
      };
    }
  }, [enableAnimation]);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;

    // マウスホイールの縦スクロールを横スクロールに変換（PCのみ）
    if (scrollContainer && window.innerWidth > 768) {
      const handleWheel = (e: WheelEvent) => {
        // 横スクロールの場合は何もしない
        if (Math.abs(e.deltaY) < Math.abs(e.deltaX)) return;

        const maxScrollLeft = scrollContainer.scrollWidth - scrollContainer.clientWidth;

        // RTLレイアウトでの境界チェック
        // Chrome/Safari: scrollLeftは負の値
        // Firefox: scrollLeftは正の値で減少
        const isAtStart = scrollContainer.scrollLeft >= 0 && scrollContainer.scrollLeft <= 1;
        const isAtEnd = Math.abs(scrollContainer.scrollLeft) >= maxScrollLeft - 1;

        if (
          (isAtEnd && e.deltaY > 0) || // 最後まで来て下スクロール
          (isAtStart && e.deltaY < 0) // 最初で上スクロール
        ) {
          return;
        }

        // デフォルトの縦スクロールを防ぐ
        e.preventDefault();

        // 縦のスクロール量を横スクロールに変換
        // RTLなので、下スクロール（正の値）で左へ移動
        scrollContainer.scrollBy({
          left: -e.deltaY,
          behavior: 'auto', // smoothだと遅延が発生するのでauto
        });
      };

      scrollContainer.addEventListener('wheel', handleWheel, { passive: false });

      return () => {
        scrollContainer.removeEventListener('wheel', handleWheel);
      };
    }
  }, []);

  return (
    <div className={styles.pageContainer}>
      {/* 固定メニュー */}
      <div
        ref={fixedMenuRef}
        className={`${styles.fixedMenu} ${shouldShowFixedMenu ? styles.fixedMenuShow : ''}`}
        id="fixed-menu"
      >
        <NavigationWrapper />
        <div className={styles.seasonInfo}>
          <CurrentDate />
          <SeasonDisplay />
        </div>
      </div>

      <main
        className={`${styles.horizontalScroll} horizontal-scroll`}
        id="scroll-container"
        ref={scrollContainerRef}
      >
        {children}
      </main>
    </div>
  );
}
