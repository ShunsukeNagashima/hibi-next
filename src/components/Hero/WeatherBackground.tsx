import Image from 'next/image';
import { forwardRef } from 'react';
import type { BackgroundPattern } from '../../utils/season';
import * as styles from './WeatherBackground.css';

interface WeatherBackgroundProps {
  backgroundImages: BackgroundPattern;
}

export const WeatherBackground = forwardRef<HTMLDivElement, WeatherBackgroundProps>(
  ({ backgroundImages }, ref) => {
    console.log('WeatherBackground rendering with:', backgroundImages);
    return (
      <div className={styles.background} ref={ref} id="weather-background">
        <Image
          src={backgroundImages.desktop}
          alt=""
          className={styles.backgroundDesktop}
          width={0}
          height={0}
          sizes="100vw"
          onError={(e) => console.error('Desktop image failed to load:', e.currentTarget.src)}
          onLoad={() => console.log('Desktop image loaded:', backgroundImages.desktop)}
        />
        <Image
          src={backgroundImages.mobile}
          alt=""
          className={styles.backgroundMobile}
          width={0}
          height={0}
          sizes="100vw"
          onError={(e) => console.error('Mobile image failed to load:', e.currentTarget.src)}
          onLoad={() => console.log('Mobile image loaded:', backgroundImages.mobile)}
        />
      </div>
    );
  }
);
