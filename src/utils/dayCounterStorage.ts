/**
 * DayCounterの表示制御に関するlocalStorage操作
 */

const STORAGE_KEY = 'hibidayCounterLastShown';
const COOLDOWN_HOURS = 24; // 24時間のクールダウン

/**
 * DayCounterを表示すべきかどうかを判定
 */
export function shouldShowDayCounter(): boolean {
  if (typeof window === 'undefined') {
    return false; // SSR時は表示しない
  }

  try {
    const lastShown = localStorage.getItem(STORAGE_KEY);
    if (!lastShown) {
      return true; // 初回は表示
    }

    const lastShownTime = new Date(lastShown);
    const now = new Date();
    const hoursSinceLastShown = (now.getTime() - lastShownTime.getTime()) / (1000 * 60 * 60);

    return hoursSinceLastShown >= COOLDOWN_HOURS;
  } catch {
    // localStorageが使用できない場合は表示しない
    return false;
  }
}

/**
 * DayCounterを表示したことを記録
 */
export function recordDayCounterShown(): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    const now = new Date();
    localStorage.setItem(STORAGE_KEY, now.toISOString());
  } catch {
    // localStorageが使用できない場合は何もしない
  }
}
