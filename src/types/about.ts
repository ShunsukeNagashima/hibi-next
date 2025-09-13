export interface Owner {
  fieldId: string;
  name: string;
}

export interface About {
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title: string;
  body: string;
  owners: Owner[];
}
