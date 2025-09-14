import { useEffect, useState } from 'react';

export interface Season {
  name: string;
  startMonth: number;
  startDay: number;
  endMonth: number;
  endDay: number;
}

export const seasons: Season[] = [
  // 春
  { name: '立春', startMonth: 2, startDay: 4, endMonth: 2, endDay: 18 },
  { name: '雨水', startMonth: 2, startDay: 19, endMonth: 3, endDay: 4 },
  { name: '啓蟄', startMonth: 3, startDay: 5, endMonth: 3, endDay: 19 },
  { name: '春分', startMonth: 3, startDay: 20, endMonth: 4, endDay: 3 },
  { name: '清明', startMonth: 4, startDay: 4, endMonth: 4, endDay: 18 },
  { name: '穀雨', startMonth: 4, startDay: 19, endMonth: 5, endDay: 4 },

  // 夏
  { name: '立夏', startMonth: 5, startDay: 5, endMonth: 5, endDay: 19 },
  { name: '小満', startMonth: 5, startDay: 20, endMonth: 6, endDay: 4 },
  { name: '芒種', startMonth: 6, startDay: 5, endMonth: 6, endDay: 20 },
  { name: '夏至', startMonth: 6, startDay: 21, endMonth: 7, endDay: 6 },
  { name: '小暑', startMonth: 7, startDay: 7, endMonth: 7, endDay: 22 },
  { name: '大暑', startMonth: 7, startDay: 23, endMonth: 8, endDay: 7 },

  // 秋
  { name: '立秋', startMonth: 8, startDay: 8, endMonth: 8, endDay: 22 },
  { name: '処暑', startMonth: 8, startDay: 23, endMonth: 9, endDay: 7 },
  { name: '白露', startMonth: 9, startDay: 8, endMonth: 9, endDay: 22 },
  { name: '秋分', startMonth: 9, startDay: 23, endMonth: 10, endDay: 7 },
  { name: '寒露', startMonth: 10, startDay: 8, endMonth: 10, endDay: 23 },
  { name: '霜降', startMonth: 10, startDay: 24, endMonth: 11, endDay: 7 },

  // 冬
  { name: '立冬', startMonth: 11, startDay: 8, endMonth: 11, endDay: 21 },
  { name: '小雪', startMonth: 11, startDay: 22, endMonth: 12, endDay: 6 },
  { name: '大雪', startMonth: 12, startDay: 7, endMonth: 12, endDay: 21 },
  { name: '冬至', startMonth: 12, startDay: 22, endMonth: 1, endDay: 5 }, // 年をまたぐ
  { name: '小寒', startMonth: 1, startDay: 6, endMonth: 1, endDay: 19 },
  { name: '大寒', startMonth: 1, startDay: 20, endMonth: 2, endDay: 3 },
];

export const getCurrentSeason = (date: Date): string => {
  const month = date.getMonth() + 1; // getMonth() は 0-11 なので +1
  const day = date.getDate();

  for (const season of seasons) {
    // 年をまたぐ場合の処理（冬至）
    if (season.startMonth > season.endMonth) {
      if (
        (month === season.startMonth && day >= season.startDay) ||
        (month === season.endMonth && day <= season.endDay)
      ) {
        return season.name;
      }
    } else {
      // 通常の場合
      if (season.startMonth === season.endMonth) {
        // 同じ月内で完結する場合
        if (month === season.startMonth && day >= season.startDay && day <= season.endDay) {
          return season.name;
        }
      } else {
        // 複数月にまたがる場合
        if (
          (month === season.startMonth && day >= season.startDay) ||
          (month === season.endMonth && day <= season.endDay) ||
          (month > season.startMonth && month < season.endMonth)
        ) {
          return season.name;
        }
      }
    }
  }

  return '';
};

export const useSeasonDisplay = () => {
  const [currentSeason, setCurrentSeason] = useState('');

  useEffect(() => {
    const today = new Date();
    const season = getCurrentSeason(today);
    setCurrentSeason(season);
  }, []);

  return { currentSeason };
};
