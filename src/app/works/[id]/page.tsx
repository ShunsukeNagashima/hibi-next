import { notFound } from 'next/navigation';
import { Footer } from '../../../components/Footer/Footer';
import { PageLayout } from '../../../components/Layout/PageLayout';
import { WorkDetail } from '../../../components/WorkDetail/WorkDetail';
import { getWork } from '../../../lib/microcms';
import type { Work } from '../../../types/work';

interface WorkPageProps {
  params: Promise<{ id: string }>;
}

async function getWorkData(id: string): Promise<Work | null> {
  try {
    const work = await getWork(id);
    return work;
  } catch (_error) {
    return null;
  }
}

export default async function WorkPage({ params }: WorkPageProps) {
  const { id } = await params;
  const work = await getWorkData(id);

  if (!work) {
    notFound();
  }

  return (
    <PageLayout>
      <WorkDetail work={work} />
      <Footer topSection="work-header" isTopPage={false} />
    </PageLayout>
  );
}

export async function generateMetadata({ params }: WorkPageProps) {
  const { id } = await params;
  const work = await getWorkData(id);

  if (!work) {
    return {
      title: 'Work not found',
    };
  }

  const description = work.summary || work.subtitle || '';
  const ogImage = work.images?.[0]?.url || '/hibi-ogp.png';

  return {
    title: `${work.title} - 日々`,
    description,
    openGraph: {
      title: `${work.title} - 日々`,
      description,
      images: ogImage,
      url: `https://hibi-atelier.com/works/${work.id}`,
      type: 'website',
      siteName: '日々',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${work.title} - 日々`,
      description,
      images: ogImage,
    },
  };
}
