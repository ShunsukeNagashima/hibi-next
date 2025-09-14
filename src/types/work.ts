export type WorkCategory = 'architecture' | 'pottery' | 'others';

export interface Work {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title: string;
  description: string;
  location: string;
  category: WorkCategory;
  images: {
    url: string;
    height: number;
    width: number;
  }[];
}

export interface WorksResponse {
  contents: Work[];
  totalCount: number;
  offset: number;
  limit: number;
}
