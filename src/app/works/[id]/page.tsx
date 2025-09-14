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

  return {
    title: `${work.title} - 日々`,
    description: work.summary || work.subtitle || '',
  };
}
