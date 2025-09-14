import { createClient } from 'microcms-js-sdk';
import type { About } from '../types/about';
import type { ContactResponse } from '../types/contact';
import type { GalleriesResponse } from '../types/gallery';
import type { Work, WorksResponse } from '../types/work';

if (!process.env.MICROCMS_SERVICE_DOMAIN) {
  throw new Error('MICROCMS_SERVICE_DOMAIN is not defined in environment variables');
}

if (!process.env.MICROCMS_API_KEY) {
  throw new Error('MICROCMS_API_KEY is not defined in environment variables');
}

const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: process.env.MICROCMS_API_KEY,
});

export const getAbout = async (): Promise<About> => {
  return await client.get({
    endpoint: 'about',
  });
};

export const getGalleries = async (
  offset: number = 0,
  limit: number = 100
): Promise<GalleriesResponse> => {
  return await client.get({
    endpoint: 'galleries',
    queries: {
      offset,
      limit,
    },
  });
};

export const getWork = async (contentId: string): Promise<Work> => {
  return await client.get({
    endpoint: 'works',
    contentId,
  });
};

export const getWorksByCategory = async (
  category: string,
  offset: number = 0,
  limit: number = 10
): Promise<WorksResponse> => {
  return await client.get({
    endpoint: 'works',
    queries: {
      filters: `category[contains]${category}`,
      offset,
      limit,
    },
  });
};

export const getWorksCategoryCount = async (category: string): Promise<number> => {
  const response = await client.get({
    endpoint: 'works',
    queries: {
      filters: `category[contains]${category}`,
      limit: 1,
    },
  });
  return response.totalCount;
};

export const getContact = async (): Promise<ContactResponse> => {
  return await client.get({
    endpoint: 'contact',
  });
};
