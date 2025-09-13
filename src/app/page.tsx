import { About } from '../components/About/About';
import DayCounterOverlay from '../components/Hero/DayCounterOverlay';
import Hero from '../components/Hero/Hero';
import { PageLayout } from '../components/Layout/PageLayout';
import { getAbout } from '../lib/microcms';
import { getWeatherBackgroundImages } from '../utils/weather';

export default async function Home() {
  // 天気APIから背景画像を取得
  const backgroundImages = await getWeatherBackgroundImages();

  // microCMSからAboutデータを取得
  const aboutData = await getAbout();

  return (
    <>
      <DayCounterOverlay />
      <PageLayout>
        <Hero backgroundImages={backgroundImages} dataSection="hero" />
        <About aboutData={aboutData} dataSection="about" />
      </PageLayout>
    </>
  );
}
