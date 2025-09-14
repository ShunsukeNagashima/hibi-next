import * as common from '../../styles/common.css';
import type { Work, WorkCategory } from '../../types/work';
import { IndexLabel } from '../IndexLabel/IndexLabel';
import { WorkItems } from './WorkItems';
import * as styles from './WorksList.css';

interface Category {
  key: WorkCategory;
  jp: string;
  en: string;
}

interface CategoryData {
  category: Category;
  works: Work[];
  totalCount: number;
  hasMore: boolean;
}

interface WorksListProps {
  categoriesData: CategoryData[];
  dataSection?: string;
}

export function WorksList({ categoriesData, dataSection = 'works-list' }: WorksListProps) {
  return (
    <section className={styles.worksList} data-section={dataSection}>
      <div className={styles.content}>
        <IndexLabel text="索引" />

        <div className={styles.worksSections}>
          {categoriesData.map(({ category, works, hasMore }, categoryIndex) => (
            <div
              key={category.key}
              className={`${styles.workSection} ${
                categoryIndex > 0 ? styles.sectionWithMargin : ''
              }`}
            >
              <WorkItems initialWorks={works} hasMore={hasMore} category={category.key} />
              <div className={styles.caseIndex}>
                <div className={`${styles.categoryJp} ${common.verticalTextJp}`}>{category.jp}</div>
                <div className={`${styles.categoryEn} ${common.verticalTextEn}`}>{category.en}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
