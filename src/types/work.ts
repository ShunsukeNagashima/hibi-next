export type WorkCategory = 'architecture' | 'pottery' | 'others';

export interface Contributor {
  role: string;
  names: string;
}

export interface Concept {
  title: string;
  body: string;
}

export interface Work {
  id: string;
  title: string;
  subtitle?: string;
  category: WorkCategory[];
  images: {
    url: string;
    height: number;
    width: number;
  }[];
  summary?: string;
  contributors?: Contributor[];
  concepts?: Concept[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  description: string;
  location: string;
}

export interface WorksResponse {
  contents: Work[];
  totalCount: number;
  offset: number;
  limit: number;
}
