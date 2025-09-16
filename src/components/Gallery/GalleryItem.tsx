import Image from 'next/image';
import Link from 'next/link';
import * as styles from './Gallery.css';

interface ImageData {
  type: 'gallery' | 'work';
  src: string;
  alt: string;
  id?: string;
}

interface GalleryItemProps {
  image: ImageData;
  className: string;
}

export const GalleryItem = ({ image, className }: GalleryItemProps) => {
  const imageElement = (
    <Image
      src={image.src}
      alt={image.alt}
      width={0}
      height={0}
      sizes="100%"
      className={className}
    />
  );

  return image.type === 'work' ? (
    <Link href={`/works/${image.id}`} className={styles.galleryLink}>
      {imageElement}
    </Link>
  ) : (
    imageElement
  );
};
