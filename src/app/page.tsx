import { About } from '../components/About/About';
import { Contact } from '../components/Contact/Contact';
import { Footer } from '../components/Footer/Footer';
import { Gallery } from '../components/Gallery/Gallery';
import DayCounterOverlay from '../components/Hero/DayCounterOverlay';
import Hero from '../components/Hero/Hero';
import { PageLayout } from '../components/Layout/PageLayout';
import { WorksList } from '../components/WorksList/WorksList';
import {
  getAbout,
  getContact,
  getGalleries,
  getWorksByCategory,
  getWorksCategoryCount,
} from '../lib/microcms';
import type { WorkCategory } from '../types/work';
import { getWeatherBackgroundImages } from '../utils/weather';

export default async function Home() {
  // 天気APIから背景画像を取得
  const backgroundImages = await getWeatherBackgroundImages();

  // microCMSからデータを取得
  const aboutData = await getAbout();
  const galleriesResponse = await getGalleries();
  const architectureWorks = await getWorksByCategory('architecture', 0, 4);
  const potteryWorks = await getWorksByCategory('pottery', 0, 2);

  // WorksListのカテゴリデータを取得
  const categories: Array<{ key: WorkCategory; jp: string; en: string }> = [
    { key: 'others', jp: 'その他', en: 'Others' },
    { key: 'pottery', jp: '陶芸', en: 'Pottery' },
    { key: 'architecture', jp: '建築', en: 'Architecture' },
  ];

  const categoriesData = await Promise.all(
    categories.map(async (category) => {
      const [worksResponse, totalCount] = await Promise.all([
        getWorksByCategory(category.key, 0, 10),
        getWorksCategoryCount(category.key),
      ]);
      return {
        category,
        works: worksResponse.contents,
        totalCount,
        hasMore: totalCount > 10,
      };
    })
  );

  // Contactデータを取得
  const contactResponse = await getContact();
  const contactItems = contactResponse?.contents || [];

  return (
    <>
      <DayCounterOverlay />
      <PageLayout enableAnimation={true}>
        <Hero backgroundImages={backgroundImages} dataSection="hero" />
        <About aboutData={aboutData} dataSection="about" />
        <Gallery
          galleryImages={galleriesResponse.contents || []}
          architectureWorks={architectureWorks.contents || []}
          potteryWorks={potteryWorks.contents || []}
          dataSection="gallery"
        />
        <WorksList categoriesData={categoriesData} dataSection="works-list" />
        <Contact contactItems={contactItems} dataSection="contact" />
        <Footer topSection="hero" isTopPage={true} />
      </PageLayout>
    </>
  );
}
