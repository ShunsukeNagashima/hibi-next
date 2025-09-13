import { createClient } from 'microcms-js-sdk';
import type { About } from '../types/about';

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
