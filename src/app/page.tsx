import { About } from '../components/About/About';
import { Gallery } from '../components/Gallery/Gallery';
import DayCounterOverlay from '../components/Hero/DayCounterOverlay';
import Hero from '../components/Hero/Hero';
import { PageLayout } from '../components/Layout/PageLayout';
import { getAbout, getGalleries, getWorksByCategory } from '../lib/microcms';
import { getWeatherBackgroundImages } from '../utils/weather';

export default async function Home() {
  // 天気APIから背景画像を取得
  const backgroundImages = await getWeatherBackgroundImages();

  // microCMSからデータを取得
  const aboutData = await getAbout();
  const galleriesResponse = await getGalleries();
  const architectureWorks = await getWorksByCategory('architecture', 0, 4);
  const potteryWorks = await getWorksByCategory('pottery', 0, 2);

  return (
    <>
      <DayCounterOverlay />
      <PageLayout>
        <Hero backgroundImages={backgroundImages} dataSection="hero" />
        <About aboutData={aboutData} dataSection="about" />
        <Gallery
          galleryImages={galleriesResponse.contents || []}
          architectureWorks={architectureWorks.contents || []}
          potteryWorks={potteryWorks.contents || []}
          dataSection="gallery"
        />
      </PageLayout>
    </>
  );
}
