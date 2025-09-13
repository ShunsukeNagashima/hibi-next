import DayCounterOverlay from '../components/Hero/DayCounterOverlay';
import Hero from '../components/Hero/Hero';
import { getBackgroundImage, getSeason } from '../utils/season';

export default function Home() {
  // 現在の季節を取得
  const currentSeason = getSeason();

  // とりあえずsunnyで背景画像を取得（後で天気APIと連携）
  const backgroundImages = getBackgroundImage(currentSeason, 'sunny');

  return (
    <>
      <DayCounterOverlay />
      <main>
        <Hero backgroundImages={backgroundImages} dataSection="hero" />
      </main>
    </>
  );
}
