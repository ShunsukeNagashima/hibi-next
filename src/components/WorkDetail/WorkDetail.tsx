'use client';

import Image from 'next/image';
import '../../styles/animations.css';
import { useBlurAnimation } from '../../hooks/useBlurAnimation';
import * as common from '../../styles/common.css';
import type { Work } from '../../types/work';
import { IndexLabel } from '../IndexLabel/IndexLabel';
import * as styles from './WorkDetail.css';

interface WorkDetailProps {
  work: Work;
}

export const WorkDetail: React.FC<WorkDetailProps> = ({ work }) => {
  // contributorsのnamesをカンマ区切りで分割する関数
  const parseContributorNames = (names: string): string[] => {
    return names
      .split(',')
      .map((name) => name.trim())
      .filter((name) => name.length > 0);
  };

  // 共通のブラーアニメーションを使用
  useBlurAnimation();

  return (
    <div className={styles.workDetail}>
      {/* ヘッダー情報 */}
      <div
        className={`${styles.sectionContent} ${styles.headerContent}`}
        data-section="work-header"
      >
        <div className={styles.workTitleSection}>
          <h1 className={`${styles.workTitle} ${common.verticalTextJp}`}>{work.title}</h1>
          {work.subtitle && (
            <p className={`${styles.workSubtitle} ${common.verticalTextJp}`}>{work.subtitle}</p>
          )}
        </div>
      </div>

      {/* 画像ギャラリー */}
      {work.images.length > 0 && (
        <div
          className={`${styles.sectionContent} ${styles.galleryContent} ${
            !work.contributors || work.contributors.length === 0 ? styles.noContributors : ''
          }`}
        >
          {work.images.map((image) => (
            <div key={image.url} className={`${styles.galleryImage} inview-blur`}>
              <Image src={image.url} alt={work.title} width={image.width} height={image.height} />
            </div>
          ))}
        </div>
      )}

      {/* コンセプト */}
      {work.concepts && work.concepts.length > 0 && (
        <div className={`${styles.sectionContent} ${styles.conceptsContent}`}>
          {work.concepts.map((concept) => (
            <div key={concept.title} className={styles.conceptSection}>
              <h2 className={`${styles.conceptTitle} ${common.verticalTextJp}`}>{concept.title}</h2>
              <p className={`${styles.conceptBody} ${common.verticalTextJp}`}>{concept.body}</p>
            </div>
          ))}
        </div>
      )}

      {/* 関係者情報 */}
      {work.contributors && work.contributors.length > 0 && (
        <div className={`${styles.sectionContent} ${styles.contributorsContent}`}>
          <IndexLabel text="関係者" />

          <div className={styles.contributorList}>
            {work.contributors.map((contributor) => (
              <div
                key={`${contributor.role}-${contributor.names}`}
                className={styles.contributorGroup}
              >
                <p className={`${styles.contributorRole} ${common.verticalTextEn}`}>
                  {contributor.role}{' '}
                </p>
                <span className={`${styles.contributorColon} ${common.verticalTextJp}`}>:</span>
                <div className={styles.contributorNames}>
                  {parseContributorNames(contributor.names).map((name, nameIndex, array) => (
                    <div
                      key={`${contributor.role}-${name}`}
                      className={styles.contributorNameWrapper}
                    >
                      <p className={`${styles.contributorName} ${common.verticalTextJp}`}>{name}</p>
                      {nameIndex < array.length - 1 && (
                        <span className={`${styles.separator} ${common.verticalTextJp}`}>｜</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
