'use client';

import Link from 'next/link';
import { useState } from 'react';
import * as common from '../../styles/common.css';
import type { Work, WorkCategory } from '../../types/work';
import * as styles from './WorkItems.css';

interface WorkItemsProps {
  initialWorks: Work[];
  hasMore: boolean;
  category: WorkCategory;
}

export function WorkItems({ initialWorks, hasMore, category }: WorkItemsProps) {
  const [works, setWorks] = useState<Work[]>(initialWorks);
  const [hasMoreWorks, setHasMoreWorks] = useState<boolean>(hasMore);
  const [loading, setLoading] = useState<boolean>(false);

  const loadMore = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const { getWorksByCategory } = await import('../../lib/microcms');
      const workResponse = await getWorksByCategory(category, works.length, 10);
      const newWorks = [...works, ...workResponse.contents];
      setWorks(newWorks);
      setHasMoreWorks(
        workResponse.contents.length === 10 && newWorks.length < workResponse.totalCount
      );
    } catch (error) {
      console.error('Failed to load more works:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {hasMoreWorks && (
        <button
          type="button"
          className={`${styles.viewMore} ${common.verticalTextEn}`}
          onClick={loadMore}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'View More'}
        </button>
      )}
      <div className={styles.caseContent}>
        {works.map((work, index) => (
          <div
            className={`${styles.caseList} ${index < works.length - 1 ? styles.caseListWithBorder : ''}`}
            key={work.id}
          >
            <Link
              href={`/works/${work.id}`}
              className={`${styles.workTitle} ${common.verticalTextJp}`}
            >
              {work.title}
              <div className={styles.arrow}>→</div>
            </Link>
            {work.summary && (
              <div className={`${styles.workDescription} ${common.verticalTextJp}`}>
                {work.summary}
              </div>
            )}
            {work.subtitle && (
              <div className={`${styles.workSubtitle} ${common.verticalTextJp}`}>
                {work.subtitle}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
