'use server';

import { getGalleries, getWorksByCategory } from '../../lib/microcms';
import type { GalleryImage } from '../../types/gallery';

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function getRandomItem<T>(array: T[]): T | null {
  if (!array || array.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

interface ImageData {
  type: 'gallery' | 'work';
  src: string;
  alt: string;
  id?: string;
}

interface GalleryData {
  imageSet1: ImageData[];
  imageSet2: ImageData[];
  colorImageIndex: number;
}

export async function getShuffledGalleryData(): Promise<GalleryData> {
  // データを取得
  const galleriesResponse = await getGalleries();
  const architectureWorks = await getWorksByCategory('architecture', 0, 4);
  const potteryWorks = await getWorksByCategory('pottery', 0, 2);

  const galleryImages = galleriesResponse.contents || [];
  const featuredImages = galleryImages.filter((img: GalleryImage) => img.isFeatured === true);
  const featuredImage =
    featuredImages.length > 0
      ? featuredImages[Math.floor(Math.random() * featuredImages.length)]
      : null;

  const imagesForShuffle = featuredImage
    ? galleryImages.filter((img: GalleryImage) => img.id !== featuredImage.id)
    : galleryImages;
  const shuffledGalleryImages = shuffleArray(imagesForShuffle);

  const createImageSet = (setIndex: number): ImageData[] => {
    const galleryStartIndex = setIndex * 3;

    return [
      setIndex === 0 && featuredImage
        ? {
            type: 'gallery' as const,
            src: featuredImage.image.url,
            alt: featuredImage.alternative,
          }
        : shuffledGalleryImages?.[galleryStartIndex]
          ? {
              type: 'gallery' as const,
              src: shuffledGalleryImages[galleryStartIndex].image.url,
              alt: shuffledGalleryImages[galleryStartIndex].alternative,
            }
          : null,

      architectureWorks.contents?.[setIndex * 2]
        ? {
            type: 'work' as const,
            src:
              getRandomItem(architectureWorks.contents[setIndex * 2].images)?.url ||
              architectureWorks.contents[setIndex * 2].images[0].url,
            alt: architectureWorks.contents[setIndex * 2].title,
            id: architectureWorks.contents[setIndex * 2].id,
          }
        : null,

      shuffledGalleryImages?.[galleryStartIndex + 1]
        ? {
            type: 'gallery' as const,
            src: shuffledGalleryImages[galleryStartIndex + 1].image.url,
            alt: shuffledGalleryImages[galleryStartIndex + 1].alternative,
          }
        : null,

      architectureWorks.contents?.[setIndex * 2 + 1]
        ? {
            type: 'work' as const,
            src:
              getRandomItem(architectureWorks.contents[setIndex * 2 + 1].images)?.url ||
              architectureWorks.contents[setIndex * 2 + 1].images[0].url,
            alt: architectureWorks.contents[setIndex * 2 + 1].title,
            id: architectureWorks.contents[setIndex * 2 + 1].id,
          }
        : null,

      shuffledGalleryImages?.[galleryStartIndex + 2]
        ? {
            type: 'gallery' as const,
            src: shuffledGalleryImages[galleryStartIndex + 2].image.url,
            alt: shuffledGalleryImages[galleryStartIndex + 2].alternative,
          }
        : null,

      potteryWorks.contents?.[setIndex]
        ? {
            type: 'work' as const,
            src:
              getRandomItem(potteryWorks.contents[setIndex].images)?.url ||
              potteryWorks.contents[setIndex].images[0].url,
            alt: potteryWorks.contents[setIndex].title,
            id: potteryWorks.contents[setIndex].id,
          }
        : null,
    ].filter(Boolean) as ImageData[];
  };

  const imageSet1 = createImageSet(0);
  const imageSet2 = createImageSet(1);
  const allImages = [...imageSet1, ...imageSet2];
  const colorImageIndex = Math.floor(Math.random() * allImages.length);

  return {
    imageSet1,
    imageSet2,
    colorImageIndex,
  };
}
