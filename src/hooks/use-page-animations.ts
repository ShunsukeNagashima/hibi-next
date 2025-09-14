import { type RefObject, useCallback, useEffect, useRef } from 'react';

interface UsePageAnimationsProps {
  logoContainerRef: RefObject<HTMLDivElement | null>;
  scrollIndicatorRef: RefObject<HTMLDivElement | null>;
  weatherBackgroundRef: RefObject<HTMLDivElement | null>;
  logoAnimationRef: RefObject<SVGAnimateElement | null>;
}

export const usePageAnimations = ({
  logoContainerRef,
  scrollIndicatorRef,
  weatherBackgroundRef,
  logoAnimationRef,
}: UsePageAnimationsProps) => {
  const animationStartedRef = useRef(false);

  // biome-ignore lint/correctness/useExhaustiveDependencies: refの依存関係は不要
  const startPageAnimations = useCallback(() => {
    console.log('startPageAnimations called, animationStarted:', animationStartedRef.current);
    if (animationStartedRef.current) {
      return;
    }
    animationStartedRef.current = true;

    // ロゴコンテナを少し遅らせて表示
    setTimeout(() => {
      if (logoContainerRef.current) {
        logoContainerRef.current.style.opacity = '1';
        console.log('logoContainer opacity set to 1');

        // SVGアニメーションを開始
        if (logoAnimationRef.current && 'beginElement' in logoAnimationRef.current) {
          logoAnimationRef.current.beginElement();
        }
      }
    }, 500);

    // アンカー付きアクセスかチェック
    const hash = window.location.hash;
    const hasAnchor = hash && hash !== '#' && hash !== '#hero';

    if (hasAnchor) {
      // アンカー付きの場合：メニューは即座に表示、他は通常通り2秒後
      if (
        typeof window !== 'undefined' &&
        'showFixedMenu' in window &&
        typeof (window as { showFixedMenu?: () => void }).showFixedMenu === 'function'
      ) {
        (window as { showFixedMenu: () => void }).showFixedMenu();
      }

      // 背景画像とスクロールインディケータは通常通り2秒後
      setTimeout(() => {
        if (weatherBackgroundRef.current) {
          weatherBackgroundRef.current.style.opacity = '1';
        }
        if (scrollIndicatorRef.current) {
          scrollIndicatorRef.current.style.opacity = '1';
        }
      }, 2000);
    } else {
      // 通常の場合：ロゴアニメーション開始から2秒後に全て表示
      setTimeout(() => {
        if (weatherBackgroundRef.current) {
          weatherBackgroundRef.current.style.opacity = '1';
        }
        if (
          typeof window !== 'undefined' &&
          'showFixedMenu' in window &&
          typeof (window as { showFixedMenu?: () => void }).showFixedMenu === 'function'
        ) {
          (window as { showFixedMenu: () => void }).showFixedMenu();
        }
        if (scrollIndicatorRef.current) {
          scrollIndicatorRef.current.style.opacity = '1';
        }
      }, 2000);
    }
  }, []);

  const checkAndNavigateToSection = useCallback(() => {
    // localStorageのターゲットセクションをチェック
    const targetSection = localStorage.getItem('target-section');
    if (targetSection) {
      localStorage.removeItem('target-section');

      // 少し待ってからスムーススクロール
      setTimeout(() => {
        const sectionElement = document.querySelector(`[data-section="${targetSection}"]`);
        if (sectionElement) {
          sectionElement.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'end',
          });
        }
      }, 200);
      return;
    }

    // localStorageにない場合はURLのハッシュをチェック
    const hash = window.location.hash;
    if (hash && hash !== '#' && hash !== '#hero') {
      const sectionName = hash.substring(1);

      // 少し待ってからスムーススクロール
      setTimeout(() => {
        const sectionElement = document.querySelector(`[data-section="${sectionName}"]`);
        if (sectionElement) {
          sectionElement.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'end',
          });
        }
      }, 200);
    }
  }, []);

  useEffect(() => {
    console.log('use-page-animations: useEffect started');

    // DayCounterOverlay完了をリッスン
    const handleDayCounterComplete = () => {
      console.log('use-page-animations: dayCounterComplete received');
      startPageAnimations();
      checkAndNavigateToSection();
    };

    // PageTransitionのスライドアウト完了をリッスン
    const handlePageTransitionComplete = () => {
      checkAndNavigateToSection();
    };

    // イベントリスナーを追加
    window.addEventListener('dayCounterComplete', handleDayCounterComplete);
    window.addEventListener('pageTransitionComplete', handlePageTransitionComplete);
    console.log('use-page-animations: event listeners added');

    // 初回チェック（DOMContentLoadedの代替）
    checkAndNavigateToSection();

    // フォールバック：アニメーションが開始されない場合の保険
    const fallbackTimer = setTimeout(() => {
      console.log(
        'use-page-animations: fallback timer triggered, animationStarted:',
        animationStartedRef.current
      );
      if (!animationStartedRef.current) {
        startPageAnimations();
      }
    }, 6000);

    // クリーンアップ
    return () => {
      window.removeEventListener('dayCounterComplete', handleDayCounterComplete);
      window.removeEventListener('pageTransitionComplete', handlePageTransitionComplete);
      clearTimeout(fallbackTimer);
    };
  }, [startPageAnimations, checkAndNavigateToSection]);

  // 必要に応じて外部から呼び出せるように関数を返す
  return {
    startPageAnimations,
    checkAndNavigateToSection,
    animationStarted: animationStartedRef.current,
  };
};
