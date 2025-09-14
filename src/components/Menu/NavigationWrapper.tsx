'use client';

import type React from 'react';
import { useState } from 'react';
import Menu from './Menu';
import * as styles from './NavigationWrapper.css';

const NavigationWrapper: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <button className={styles.menuButton} onClick={() => setIsMenuOpen(true)} type="button">
        <div className={styles.iconWrapper}>
          <span className={styles.menuIcon} />
        </div>
        <span>目次</span>
      </button>
      <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
};

export default NavigationWrapper;
