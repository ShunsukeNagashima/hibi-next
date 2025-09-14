'use client';

import type React from 'react';
import { useEffect, useState } from 'react';
import * as styles from './CurrentDate.css';

export const CurrentDate: React.FC = () => {
  const [dateString, setDateString] = useState('二〇二五年七月十一日');

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();

    // 数字を漢数字に変換
    const convertToKanji = (num: number): string => {
      const kanjiNumbers = ['〇', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
      return num
        .toString()
        .split('')
        .map((digit) => kanjiNumbers[parseInt(digit, 10)])
        .join('');
    };

    const kanjiYear = convertToKanji(year);
    const kanjiMonth = convertToKanji(month);
    const kanjiDay = convertToKanji(day);

    setDateString(`${kanjiYear}年${kanjiMonth}月${kanjiDay}日`);
  }, []);

  return <div className={styles.date}>{dateString}</div>;
};
