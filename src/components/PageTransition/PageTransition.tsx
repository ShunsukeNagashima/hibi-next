'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    navigateWithTransition?: (url: string) => void;
    testPageTransition?: (url?: string) => void;
  }
}

const overlayVariants = {
  initial: {
    x: '100%',
  },
  slideIn: {
    x: 0,
  },
  slideOut: {
    x: '100%',
  },
};

const overlayTransition = {
  duration: 0.9,
  ease: [0.8, 0, 0.2, 1] as [number, number, number, number],
};

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransitionWrapper: React.FC<PageTransitionProps> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [overlayState, setOverlayState] = useState<'hidden' | 'slideIn' | 'slideOut'>('hidden');
  const prevPathnameRef = useRef(pathname);

  const navigateWithTransition = useCallback(
    (url: string) => {
      // スライドインアニメーション開始
      setOverlayState('slideIn');

      // スライドインアニメーション完了後にページ遷移
      setTimeout(() => {
        router.push(url);
      }, 900); // アニメーション時間
    },
    [router]
  );

  // パスが変わったときの処理
  useEffect(() => {
    // 初回ロードは除外
    if (prevPathnameRef.current === pathname) {
      return;
    }

    // ページが変わったら、少し待ってからスライドアウト開始
    if (overlayState === 'slideIn') {
      setTimeout(() => {
        setOverlayState('slideOut');
      }, 200); // 少し待ってからスライドアウト
    }

    prevPathnameRef.current = pathname;
  }, [pathname, overlayState]);

  // スライドアウト完了時の処理
  const handleSlideOutComplete = useCallback(() => {
    setOverlayState('hidden');

    // PageTransition完了イベントを発火
    window.dispatchEvent(new CustomEvent('pageTransitionComplete'));
  }, []);

  const handleGlobalClick = useCallback(
    (e: MouseEvent) => {
      if (overlayState !== 'hidden') return; // アニメーション中は無視

      const target = e.target as HTMLElement;
      const link = target.closest('a[href]') as HTMLAnchorElement;

      if (!link) return;

      const href = link.getAttribute('href');

      // 内部リンクかチェック
      if (
        !href ||
        !href.startsWith('/') ||
        href.startsWith('//') ||
        href.startsWith('http') ||
        href.startsWith('mailto') ||
        href.startsWith('tel') ||
        href.startsWith('#')
      ) {
        return;
      }

      e.preventDefault();
      navigateWithTransition(href);
    },
    [navigateWithTransition, overlayState]
  );

  useEffect(() => {
    // グローバル関数を設定
    window.navigateWithTransition = navigateWithTransition;
    window.testPageTransition = (url = '/') => {
      navigateWithTransition(url);
    };

    // ページの初期状態を設定
    document.body.classList.add('page-ready');

    // クリックイベントリスナーを設定
    document.addEventListener('click', handleGlobalClick, true);

    return () => {
      document.removeEventListener('click', handleGlobalClick, true);
    };
  }, [navigateWithTransition, handleGlobalClick]);

  return (
    <>
      {/* オーバーレイアニメーション */}
      <AnimatePresence>
        {overlayState !== 'hidden' && (
          <motion.div
            key="overlay"
            initial="initial"
            animate={overlayState === 'slideIn' ? 'slideIn' : 'slideOut'}
            variants={overlayVariants}
            transition={overlayTransition}
            onAnimationComplete={() => {
              if (overlayState === 'slideOut') {
                handleSlideOutComplete();
              }
            }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: '#000A02',
              zIndex: 999999,
              pointerEvents: 'none',
            }}
          />
        )}
      </AnimatePresence>

      {/* ページコンテンツ */}
      {children}
    </>
  );
};

export default PageTransitionWrapper;
