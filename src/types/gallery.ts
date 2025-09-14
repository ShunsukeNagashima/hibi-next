export interface GalleryImage {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  image: {
    url: string;
    height: number;
    width: number;
  };
  alternative: string;
  isFeatured?: boolean;
}

export interface GalleriesResponse {
  contents: GalleryImage[];
  totalCount: number;
  offset: number;
  limit: number;
}
