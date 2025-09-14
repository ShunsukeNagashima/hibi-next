import * as common from '../../styles/common.css';
import * as styles from './IndexLabel.css';

interface IndexLabelProps {
  text: string;
  className?: string;
}

export function IndexLabel({ text, className = '' }: IndexLabelProps) {
  return (
    <div className={`${styles.indexLabel} ${className}`}>
      <div className={styles.labelLine} />
      <h2 className={`${styles.labelText} ${common.verticalTextJp}`}>{text}</h2>
      <div className={styles.labelLine} />
    </div>
  );
}
