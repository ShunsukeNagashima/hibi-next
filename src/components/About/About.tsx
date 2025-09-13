import * as common from '../../styles/common.css';
import type { About as AboutType } from '../../types/about';
import * as styles from './About.css';

interface AboutProps {
  aboutData: AboutType;
  dataSection?: string;
}

export function About({ aboutData, dataSection = 'about' }: AboutProps) {
  return (
    <section className={`${styles.about}`} data-section={dataSection} id={dataSection}>
      <div className={styles.content}>
        <h2 className={`${styles.title} ${common.verticalTextJp}`}>{aboutData.title}</h2>
        <div className={styles.textContent}>
          <p className={`${styles.textContentParagraph} ${common.verticalTextJp}`}>
            {aboutData.body}
          </p>
        </div>
        {aboutData.owners.length > 0 && (
          <div className={styles.owners}>
            {aboutData.owners.map((owner) => (
              <p key={owner.name} className={`${styles.owner} ${common.verticalTextJp}`}>
                {owner.name}
              </p>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
