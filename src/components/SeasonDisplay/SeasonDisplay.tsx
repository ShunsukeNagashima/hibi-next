'use client';

import type React from 'react';
import { useSeasonDisplay } from '../../hooks/useSeasonDisplay';
import * as styles from './SeasonDisplay.css';

export const SeasonDisplay: React.FC = () => {
  const { currentSeason } = useSeasonDisplay();

  return <span className={styles.season}>{currentSeason}</span>;
};
