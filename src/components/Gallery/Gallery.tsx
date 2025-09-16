'use client';

import '../../styles/animations.css';
import { useBlurAnimation } from '../../hooks/useBlurAnimation';
import * as animations from '../../styles/animations.css';
import * as styles from './Gallery.css';
import { GalleryItem } from './GalleryItem';

interface ImageData {
  type: 'gallery' | 'work';
  src: string;
  alt: string;
  id?: string;
}

interface GalleryProps {
  imageSet1: ImageData[];
  imageSet2: ImageData[];
  colorImageIndex: number;
  dataSection?: string;
}

export function Gallery({
  imageSet1,
  imageSet2,
  colorImageIndex,
  dataSection = 'gallery',
}: GalleryProps) {
  useBlurAnimation();

  return (
    <section className={styles.gallerySection} data-section={dataSection} id={dataSection}>
      <div className={styles.gallery}>
        <div className={styles.gallerySet}>
          {imageSet1.map((image, index) => (
            <div key={`${image.src}-${index}`} className={`${animations.inviewBlur} inview-blur`}>
              <GalleryItem
                image={image}
                className={`${styles.galleryImage} ${
                  index === colorImageIndex ? '' : styles.grayscale
                }`}
              />
            </div>
          ))}
        </div>

        <div className={styles.gallerySet}>
          {imageSet2.map((image, index) => (
            <div
              key={`${image.src}-set2-${index}`}
              className={`${animations.inviewBlur} inview-blur`}
            >
              <GalleryItem
                image={image}
                className={`${styles.galleryImage} ${
                  index + imageSet1.length === colorImageIndex ? '' : styles.grayscale
                }`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
