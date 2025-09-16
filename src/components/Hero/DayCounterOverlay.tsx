'use client';

import type React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { recordDayCounterShown, shouldShowDayCounter } from '../../utils/dayCounterStorage';
import DayCounter from './DayCounter';
import * as styles from './DayCounterOverlay.css';
import { CALCULATED_DURATIONS, CSS_DURATIONS, FADE_DURATIONS } from './dayCounterAnimations';

interface DayCounterOverlayProps {
  onComplete?: () => void;
}

const DayCounterOverlay: React.FC<DayCounterOverlayProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isOverlayFadingOut, setIsOverlayFadingOut] = useState<boolean>(false);
  const [isFadingOut, setIsFadingOut] = useState<boolean>(false);

  // アニメーション完了時の処理
  const handleAnimationComplete = useCallback((): void => {
    // 数字をフェードアウト
    setIsFadingOut(true);

    // フェードアウト完了後にオーバーレイもフェードアウト開始
    setTimeout(() => {
      setIsOverlayFadingOut(true);

      // オーバーレイフェードアウト完了後に非表示
      setTimeout(() => {
        setIsVisible(false);
        // スクロールを再有効化
        document.body.style.overflow = 'unset';

        // 完了イベントを送信
        window.dispatchEvent(new CustomEvent('dayCounterComplete'));
        onComplete?.();
      }, FADE_DURATIONS.OVERLAY_FADE);
    }, FADE_DURATIONS.COUNTER_FADE);

    // フェードアウト開始から少し後にロゴアニメーション開始イベントを送信
    setTimeout(
      () => {
        window.dispatchEvent(new CustomEvent('dayCounterFadeStart'));
      },
      FADE_DURATIONS.COUNTER_FADE + FADE_DURATIONS.OVERLAY_FADE * 0.1
    );
  }, [onComplete]);

  // コンポーネントマウント時の処理
  useEffect(() => {
    console.log('DayCounterOverlay: useEffect started');
    // localStorageで表示判定
    if (!shouldShowDayCounter()) {
      console.log('DayCounterOverlay: should NOT show counter, dispatching event after delay');
      // 表示不要の場合は少し待ってから完了（イベントリスナー登録を待つ）
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('dayCounterComplete'));
        onComplete?.();
      }, 100);
      return;
    }

    console.log('DayCounterOverlay: should show counter');
    // 表示する場合の処理
    setIsVisible(true);

    // localStorageに表示時刻を記録
    recordDayCounterShown();

    // スクロールを無効化
    document.body.style.overflow = 'hidden';

    // DayCounterのアニメーション時間後に自動で完了処理を実行
    const timer = setTimeout(() => {
      handleAnimationComplete();
    }, CALCULATED_DURATIONS.TOTAL_TIMEOUT);

    return () => {
      clearTimeout(timer);
      // クリーンアップ時にスクロールを復元
      document.body.style.overflow = 'unset';
    };
  }, [handleAnimationComplete, onComplete]);

  // 表示しない場合は何もレンダリングしない
  if (!isVisible) {
    return null;
  }

  return (
    <div
      className={`${styles.overlay} ${isOverlayFadingOut ? styles.fadeOut : ''}`}
      style={
        {
          '--overlay-fade-duration': CSS_DURATIONS.OVERLAY_FADE,
          '--counter-transition-duration': CSS_DURATIONS.COUNTER_TRANSITION,
        } as React.CSSProperties
      }
    >
      <div className={`${styles.counterWrapper} ${isFadingOut ? styles.counterFadeOut : ''}`}>
        <DayCounter />
      </div>
    </div>
  );
};

export default DayCounterOverlay;
