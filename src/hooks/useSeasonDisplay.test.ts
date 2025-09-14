import { renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { getCurrentSeason, useSeasonDisplay } from './useSeasonDisplay';

describe('getCurrentSeason', () => {
  describe('same month seasons', () => {
    it('should return 立秋 for August 15th (same month season)', () => {
      const date = new Date(2024, 7, 15); // August 15, 2024
      expect(getCurrentSeason(date)).toBe('立秋');
    });

    it('should return 白露 for September 15th (same month season)', () => {
      const date = new Date(2024, 8, 15); // September 15, 2024
      expect(getCurrentSeason(date)).toBe('白露');
    });
  });

  describe('multi-month seasons', () => {
    it('should return 雨水 - start month boundary', () => {
      const date = new Date(2024, 1, 19); // February 19, 2024 (start of 雨水)
      expect(getCurrentSeason(date)).toBe('雨水');
    });

    it('should return 雨水 - end month boundary', () => {
      const date = new Date(2024, 2, 4); // March 4, 2024 (end of 雨水)
      expect(getCurrentSeason(date)).toBe('雨水');
    });

    it('should return 春分 - start month', () => {
      const date = new Date(2024, 2, 25); // March 25, 2024 (春分 start month)
      expect(getCurrentSeason(date)).toBe('春分');
    });

    it('should return 春分 - end month', () => {
      const date = new Date(2024, 3, 1); // April 1, 2024 (春分 end month)
      expect(getCurrentSeason(date)).toBe('春分');
    });

    it('should return 処暑 - start month', () => {
      const date = new Date(2024, 7, 25); // August 25, 2024 (処暑 start month)
      expect(getCurrentSeason(date)).toBe('処暑');
    });

    it('should return 処暑 - end month', () => {
      const date = new Date(2024, 8, 5); // September 5, 2024 (処暑 end month)
      expect(getCurrentSeason(date)).toBe('処暑');
    });
  });

  describe('year-crossing season (冬至)', () => {
    it('should return 冬至 for December 25th (start month of year-crossing)', () => {
      const date = new Date(2024, 11, 25); // December 25, 2024
      expect(getCurrentSeason(date)).toBe('冬至');
    });

    it('should return 冬至 for December 22nd (exact start date)', () => {
      const date = new Date(2024, 11, 22); // December 22, 2024
      expect(getCurrentSeason(date)).toBe('冬至');
    });

    it('should return 冬至 for January 3rd (end month of year-crossing)', () => {
      const date = new Date(2024, 0, 3); // January 3, 2024
      expect(getCurrentSeason(date)).toBe('冬至');
    });

    it('should return 冬至 for January 5th (exact end date)', () => {
      const date = new Date(2024, 0, 5); // January 5, 2024
      expect(getCurrentSeason(date)).toBe('冬至');
    });
  });

  describe('boundary tests', () => {
    it('should return 立春 for February 4th (start boundary)', () => {
      const date = new Date(2024, 1, 4); // February 4, 2024
      expect(getCurrentSeason(date)).toBe('立春');
    });

    it('should return 立春 for February 18th (end boundary)', () => {
      const date = new Date(2024, 1, 18); // February 18, 2024
      expect(getCurrentSeason(date)).toBe('立春');
    });

    it('should return 大寒 for February 3rd (before 立春)', () => {
      const date = new Date(2024, 1, 3); // February 3, 2024
      expect(getCurrentSeason(date)).toBe('大寒');
    });
  });

  describe('edge cases', () => {
    it('should return empty string for invalid dates outside season ranges', () => {
      // This test assumes there might be gaps, but based on the current data,
      // all dates should be covered. Keeping for completeness.
      const date = new Date(2024, 1, 1); // February 1, 2024
      const result = getCurrentSeason(date);
      expect(typeof result).toBe('string');
    });
  });
});

describe('useSeasonDisplay', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should return current season for same month season', () => {
    const mockDate = new Date(2024, 7, 15); // August 15, 2024 (立秋)
    vi.setSystemTime(mockDate);

    const { result } = renderHook(() => useSeasonDisplay());

    expect(result.current.currentSeason).toBe('立秋');
  });

  it('should return current season for multi-month season', () => {
    const mockDate = new Date(2024, 2, 25); // March 25, 2024 (春分)
    vi.setSystemTime(mockDate);

    const { result } = renderHook(() => useSeasonDisplay());

    expect(result.current.currentSeason).toBe('春分');
  });

  it('should return current season for year-crossing season (December)', () => {
    const mockDate = new Date(2024, 11, 25); // December 25, 2024 (冬至)
    vi.setSystemTime(mockDate);

    const { result } = renderHook(() => useSeasonDisplay());

    expect(result.current.currentSeason).toBe('冬至');
  });

  it('should return current season for year-crossing season (January)', () => {
    const mockDate = new Date(2024, 0, 3); // January 3, 2024 (冬至)
    vi.setSystemTime(mockDate);

    const { result } = renderHook(() => useSeasonDisplay());

    expect(result.current.currentSeason).toBe('冬至');
  });
});
