import * as common from '../../styles/common.css';
import type { ContactItem } from '../../types/contact';
import { IndexLabel } from '../IndexLabel/IndexLabel';
import * as styles from './Contact.css';

interface ContactProps {
  contactItems: ContactItem[];
  dataSection?: string;
}

export function Contact({ contactItems, dataSection = 'contact' }: ContactProps) {
  return (
    <section className={styles.contact} data-section={dataSection} id={dataSection}>
      <div className={styles.content}>
        <IndexLabel text="日々の詳細" />

        <div className={styles.contactSections}>
          {contactItems.map((item) => (
            <div key={item.id} className={styles.contactSection}>
              <div className={styles.sectionContent}>
                <div className={`${styles.contentBody} ${common.verticalTextJp}`}>
                  {item.body
                    .split(/\n\s*\n/)
                    .filter((section) => section.trim())
                    .map((section, sectionIndex) => (
                      <div
                        key={`${item.id}-section-${sectionIndex}`}
                        className={styles.bodySection}
                      >
                        {section
                          .split('\n')
                          .filter((line) => line.trim())
                          .map((line, lineIndex) => (
                            <p
                              key={`${item.id}-line-${sectionIndex}-${lineIndex}`}
                              className={`${styles.contactParagraph} ${styles.contentBodyParagraph} ${common.verticalTextJp}`}
                            >
                              {line}
                            </p>
                          ))}
                      </div>
                    ))}
                </div>
                <div className={styles.sectionDivider} />
                <h3 className={`${styles.sectionTitle} ${common.verticalTextJp}`}>{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
