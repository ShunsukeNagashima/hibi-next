'use client';

import { forwardRef, useEffect, useState } from 'react';
import type { BackgroundPattern } from '../../utils/season';
import { getWeatherBackgroundImages } from '../../utils/weather';
import * as styles from './WeatherBackground.css';

interface WeatherBackgroundProps {
  backgroundImages?: BackgroundPattern;
}

const WeatherBackground = forwardRef<HTMLDivElement, WeatherBackgroundProps>(
  ({ backgroundImages: initialImages }, ref) => {
    const [backgroundImages, setBackgroundImages] = useState<BackgroundPattern | null>(
      initialImages || null
    );
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
      if (!initialImages) {
        getWeatherBackgroundImages().then((images) => {
          setBackgroundImages(images);
        });
      }
    }, [initialImages]);

    useEffect(() => {
      if (backgroundImages) {
        // 画像をプリロードして準備完了時にフェードイン
        const desktopImg = new Image();
        const mobileImg = new Image();
        let loadedCount = 0;

        const checkAllLoaded = () => {
          loadedCount++;
          if (loadedCount === 2) {
            setIsLoaded(true);
          }
        };

        desktopImg.onload = checkAllLoaded;
        mobileImg.onload = checkAllLoaded;
        desktopImg.onerror = checkAllLoaded; // エラーでも表示
        mobileImg.onerror = checkAllLoaded;

        desktopImg.src = backgroundImages.desktop;
        mobileImg.src = backgroundImages.mobile;
      }
    }, [backgroundImages]);

    if (!backgroundImages) {
      return null;
    }

    return (
      <div ref={ref} className={styles.backgroundContainer}>
        {/* デスクトップ版 */}
        <div
          className={`${styles.backgroundImage} ${styles.desktop} ${isLoaded ? styles.loaded : ''}`}
          style={{
            backgroundImage: `url(${backgroundImages.desktop})`,
          }}
        />

        {/* モバイル版 */}
        <div
          className={`${styles.backgroundImage} ${styles.mobile} ${isLoaded ? styles.loaded : ''}`}
          style={{
            backgroundImage: `url(${backgroundImages.mobile})`,
          }}
        />
      </div>
    );
  }
);

WeatherBackground.displayName = 'WeatherBackground';

export default WeatherBackground;
