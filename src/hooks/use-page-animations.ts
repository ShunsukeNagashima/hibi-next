import { type RefObject, useCallback, useEffect, useRef } from 'react';
import { PAGE_LOADING_DURATIONS } from '../constants/animations';
import { shouldShowDayCounter } from '../utils/dayCounterStorage';

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

        // ロゴアニメーション開始から2秒後に他の要素を同時表示（終了タイミング統一）
        setTimeout(() => {
          // 背景画像・メニュー・スクロールインディケーターを同時に表示開始
          if (weatherBackgroundRef.current) {
            weatherBackgroundRef.current.style.opacity = '1';
            weatherBackgroundRef.current.style.transition = `opacity ${PAGE_LOADING_DURATIONS.OTHER_ELEMENTS_ANIMATION_DURATION}ms ease`;
            console.log('weatherBackground opacity set to 1');
          }

          // メニュー表示イベントを発火（同時）
          window.dispatchEvent(new CustomEvent('showFixedMenu'));
          console.log('showFixedMenu event dispatched');

          // スクロールインディケーターも同時に表示開始
          if (scrollIndicatorRef.current) {
            scrollIndicatorRef.current.style.opacity = '1';
            scrollIndicatorRef.current.style.transition = `opacity ${PAGE_LOADING_DURATIONS.OTHER_ELEMENTS_ANIMATION_DURATION}ms ease`;
            console.log('scrollIndicator opacity set to 1');
          }
        }, PAGE_LOADING_DURATIONS.OTHER_ELEMENTS_START_DELAY);
      }
    }, PAGE_LOADING_DURATIONS.LOGO_DELAY);

    // アンカー付きアクセスかチェック
    const hash = window.location.hash;
    const hasAnchor = hash && hash !== '#' && hash !== '#hero';

    if (hasAnchor) {
      // アンカー付きの場合：メニューは即座に表示、他は通常通り2秒後
      // メニュー表示イベントを発火
      window.dispatchEvent(new CustomEvent('showFixedMenu'));

      // 背景画像とスクロールインディケータは通常通り2秒後
      setTimeout(() => {
        if (weatherBackgroundRef.current) {
          weatherBackgroundRef.current.style.opacity = '1';
        }
        if (scrollIndicatorRef.current) {
          scrollIndicatorRef.current.style.opacity = '1';
        }
      }, PAGE_LOADING_DURATIONS.CONTENT_DELAY);
    }
    // 通常の場合は上記の直列処理で実行済み
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
      }, PAGE_LOADING_DURATIONS.SCROLL_DELAY);
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
      }, PAGE_LOADING_DURATIONS.SCROLL_DELAY);
    }
  }, []);

  useEffect(() => {
    console.log('use-page-animations: useEffect started');

    // DayCounterフェード開始時にロゴアニメーション開始
    const handleDayCounterFadeStart = () => {
      console.log('use-page-animations: dayCounterFadeStart received');
      startPageAnimations();
    };

    // DayCounterOverlay完了をリッスン
    const handleDayCounterComplete = () => {
      console.log('use-page-animations: dayCounterComplete received');
      // DayCounterが表示されない場合はここでアニメーション開始
      if (!shouldShowDayCounter()) {
        startPageAnimations();
      }
      checkAndNavigateToSection();
    };

    // PageTransitionのスライドアウト完了をリッスン
    const handlePageTransitionComplete = () => {
      checkAndNavigateToSection();
    };

    // イベントリスナーを追加
    window.addEventListener('dayCounterFadeStart', handleDayCounterFadeStart);
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
    }, PAGE_LOADING_DURATIONS.FALLBACK_TIMEOUT);

    // クリーンアップ
    return () => {
      window.removeEventListener('dayCounterFadeStart', handleDayCounterFadeStart);
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
