'use client';

import type React from 'react';
import { useCallback, useEffect, useState } from 'react';
import * as styles from './DayCounter.css';
import { CSS_DURATIONS } from './dayCounterAnimations';

interface DigitData {
  digits: (string | number)[];
  animationClass: string;
}

const DayCounter: React.FC = () => {
  const [digitColumns, setDigitColumns] = useState<DigitData[]>([]);
  const [isClient, setIsClient] = useState(false);

  // 今日が年始から何日目かを計算
  const getDayOfYear = useCallback((): number => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const day = Math.floor(diff / oneDay);
    return day;
  }, []);

  // 数字をゼロパディングして3桁にする
  const padNumber = useCallback((num: number): string => {
    return String(num).padStart(3, '0');
  }, []);

  // アニメーションを開始
  const startAnimation = useCallback(() => {
    const dayOfYear = getDayOfYear();
    const dayStr = padNumber(dayOfYear);

    // まずアニメーションクラスをクリア
    setDigitColumns((prev) => prev.map((column) => ({ ...column, animationClass: '' })));

    // 少し待ってから新しい数字とアニメーションを設定
    setTimeout(() => {
      // 各桁の数字を生成
      const newDigitColumns: DigitData[] = [];

      for (let i = 0; i < 3; i++) {
        const digits: (string | number)[] = [];

        // ランダム数字を生成
        for (let j = 0; j < 6; j++) {
          digits.push(Math.floor(Math.random() * 10));
        }

        // 空文字（ため）
        digits.push('');

        // 最終的な数字
        digits.push(dayStr[i]);

        newDigitColumns.push({
          digits,
          animationClass: `animate${i}`,
        });
      }

      setDigitColumns(newDigitColumns);
    }, 50);
  }, [getDayOfYear, padNumber]);

  // ハイドレーション対応
  useEffect(() => {
    setIsClient(true);
  }, []);

  // クライアントサイドで初期化
  useEffect(() => {
    if (isClient && digitColumns.length === 0) {
      const timer = setTimeout(() => {
        startAnimation();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isClient, startAnimation, digitColumns.length]);

  // SSR中は何も表示しない
  if (!isClient) {
    return <div className={styles.dayCounterWrapper} />;
  }

  return (
    <div
      className={styles.dayCounterWrapper}
      style={
        {
          '--slot-spin-0-duration': CSS_DURATIONS.SLOT_SPIN_0,
          '--slot-spin-1-duration': CSS_DURATIONS.SLOT_SPIN_1,
          '--slot-spin-2-duration': CSS_DURATIONS.SLOT_SPIN_2,
        } as React.CSSProperties
      }
    >
      <div className={styles.counterContainer}>
        <div className={styles.slotContainer}>
          {digitColumns.map((column, columnIndex) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: スタティックな3桁の配列のため安全
            <div key={columnIndex} className={styles.digitSlot}>
              <div
                className={`${styles.digitColumn} ${
                  column.animationClass === 'animate0'
                    ? styles.animate0
                    : column.animationClass === 'animate1'
                      ? styles.animate1
                      : column.animationClass === 'animate2'
                        ? styles.animate2
                        : ''
                }`}
                data-digit={columnIndex}
              >
                {column.digits.map((digit, digitIndex) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: スタティックな配列のため安全
                  <div key={digitIndex} className={styles.digit}>
                    {digit}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <span className={styles.separator}>/</span>
        <span className={styles.yearTotal}>365</span>
      </div>
    </div>
  );
};

export default DayCounter;
