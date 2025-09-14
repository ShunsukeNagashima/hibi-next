'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import '../../styles/animations.css';
import { useBlurAnimation } from '../../hooks/useBlurAnimation';
import * as animations from '../../styles/animations.css';
import type { GalleryImage } from '../../types/gallery';
import type { Work } from '../../types/work';
import * as styles from './Gallery.css';

interface ImageData {
  type: 'gallery' | 'work';
  src: string;
  alt: string;
  id?: string;
}

interface GalleryProps {
  galleryImages: GalleryImage[];
  architectureWorks: Work[];
  potteryWorks: Work[];
  dataSection?: string;
}

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

export function Gallery({
  galleryImages,
  architectureWorks,
  potteryWorks,
  dataSection = 'gallery',
}: GalleryProps) {
  useBlurAnimation();

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { imageSet1, imageSet2, colorImageIndex } = useMemo(() => {
    // クライアントサイドでのみランダム処理を実行
    if (!isClient) {
      return {
        imageSet1: [],
        imageSet2: [],
        colorImageIndex: 0,
      };
    }
    const featuredImages = galleryImages.filter((img) => img.isFeatured === true);
    const featuredImage =
      featuredImages.length > 0
        ? featuredImages[Math.floor(Math.random() * featuredImages.length)]
        : null;

    const imagesForShuffle = featuredImage
      ? galleryImages.filter((img) => img.id !== featuredImage.id)
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

        architectureWorks?.[setIndex * 2]
          ? {
              type: 'work' as const,
              src:
                getRandomItem(architectureWorks[setIndex * 2].images)?.url ||
                architectureWorks[setIndex * 2].images[0].url,
              alt: architectureWorks[setIndex * 2].title,
              id: architectureWorks[setIndex * 2].id,
            }
          : null,

        shuffledGalleryImages?.[galleryStartIndex + 1]
          ? {
              type: 'gallery' as const,
              src: shuffledGalleryImages[galleryStartIndex + 1].image.url,
              alt: shuffledGalleryImages[galleryStartIndex + 1].alternative,
            }
          : null,

        architectureWorks?.[setIndex * 2 + 1]
          ? {
              type: 'work' as const,
              src:
                getRandomItem(architectureWorks[setIndex * 2 + 1].images)?.url ||
                architectureWorks[setIndex * 2 + 1].images[0].url,
              alt: architectureWorks[setIndex * 2 + 1].title,
              id: architectureWorks[setIndex * 2 + 1].id,
            }
          : null,

        shuffledGalleryImages?.[galleryStartIndex + 2]
          ? {
              type: 'gallery' as const,
              src: shuffledGalleryImages[galleryStartIndex + 2].image.url,
              alt: shuffledGalleryImages[galleryStartIndex + 2].alternative,
            }
          : null,

        potteryWorks?.[setIndex]
          ? {
              type: 'work' as const,
              src:
                getRandomItem(potteryWorks[setIndex].images)?.url ||
                potteryWorks[setIndex].images[0].url,
              alt: potteryWorks[setIndex].title,
              id: potteryWorks[setIndex].id,
            }
          : null,
      ].filter(Boolean) as ImageData[];
    };

    const set1 = createImageSet(0);
    const set2 = createImageSet(1);
    const allImages = [...set1, ...set2];
    const randomColorIndex = Math.floor(Math.random() * allImages.length);

    return {
      imageSet1: set1,
      imageSet2: set2,
      colorImageIndex: randomColorIndex,
    };
  }, [galleryImages, architectureWorks, potteryWorks, isClient]);

  return (
    <section className={styles.gallerySection} data-section={dataSection} id={dataSection}>
      <div className={styles.gallery}>
        <div className={styles.gallerySet}>
          {imageSet1.map((image, index) => (
            <div key={`${image.src}-${index}`} className={`${animations.inviewBlur} inview-blur`}>
              {image.type === 'work' ? (
                <Link href={`/works/${image.id}`} className={styles.galleryLink}>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={0}
                    height={0}
                    sizes="100%"
                    className={`${styles.galleryImage} ${
                      index === colorImageIndex ? '' : styles.grayscale
                    }`}
                  />
                </Link>
              ) : (
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={0}
                  height={0}
                  sizes="100%"
                  className={`${styles.galleryImage} ${
                    index === colorImageIndex ? '' : styles.grayscale
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <div className={styles.gallerySet}>
          {imageSet2.map((image, index) => (
            <div
              key={`${image.src}-set2-${index}`}
              className={`${animations.inviewBlur} inview-blur`}
            >
              {image.type === 'work' ? (
                <Link href={`/works/${image.id}`} className={styles.galleryLink}>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={0}
                    height={0}
                    sizes="100%"
                    className={`${styles.galleryImage} ${
                      index + imageSet1.length === colorImageIndex ? '' : styles.grayscale
                    }`}
                  />
                </Link>
              ) : (
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={0}
                  height={0}
                  sizes="100%"
                  className={`${styles.galleryImage} ${
                    index + imageSet1.length === colorImageIndex ? '' : styles.grayscale
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
