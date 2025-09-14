export interface ContactItem {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title: string;
  body: string;
}

export interface ContactResponse {
  contents: ContactItem[];
  totalCount: number;
  offset: number;
  limit: number;
}
