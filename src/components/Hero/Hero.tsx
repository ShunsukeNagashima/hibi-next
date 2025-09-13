'use client';

import { useRef } from 'react';
import { usePageAnimations } from '@/hooks/use-page-animations';
import type { BackgroundPattern } from '../../utils/season';
import { AnimatedLogo } from './AnimatedLogo';
import * as styles from './Hero.css';
import { WeatherBackground } from './WeatherBackground';

interface HeroProps {
  backgroundImages: BackgroundPattern;
  dataSection?: string;
}

const Hero: React.FC<HeroProps> = ({ backgroundImages, dataSection }) => {
  const logoContainerRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const weatherBackgroundRef = useRef<HTMLDivElement>(null);
  const logoAnimationRef = useRef<SVGAnimateElement>(null);

  usePageAnimations({
    logoContainerRef,
    scrollIndicatorRef,
    weatherBackgroundRef,
    logoAnimationRef,
  });

  return (
    <section className={styles.hero} data-section={dataSection}>
      {/* 季節×天気別背景画像 */}
      <WeatherBackground ref={weatherBackgroundRef} backgroundImages={backgroundImages} />

      {/* ロゴ表示エリア */}
      <div ref={logoContainerRef} className={styles.logoContainer}>
        <AnimatedLogo ref={logoAnimationRef} />
      </div>

      {/* 左下スクロールインジケーター */}
      <div ref={scrollIndicatorRef} className={styles.scrollIndicator}>
        <div className={styles.scrollBar}>
          <div className={styles.scrollProgress} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
