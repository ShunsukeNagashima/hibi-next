'use client';

import { type ReactNode, useEffect, useRef } from 'react';
import * as styles from './PageLayout.css';

interface PageLayoutProps {
  children: ReactNode;
}

export function PageLayout({ children }: PageLayoutProps) {
  const scrollContainerRef = useRef<HTMLElement>(null);

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
