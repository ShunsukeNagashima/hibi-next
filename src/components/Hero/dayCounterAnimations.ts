/**
 * DayCounterアニメーションの時間定数
 */

// スロットアニメーション時間（秒）
export const SLOT_ANIMATION_DURATIONS = {
  DIGIT_0: 4.1, // 1桁目
  DIGIT_1: 3.8, // 2桁目
  DIGIT_2: 3.7, // 3桁目
} as const;

// フェードアウト時間（ミリ秒）
export const FADE_DURATIONS = {
  COUNTER_FADE: 800, // 数字フェードアウト時間
  OVERLAY_FADE: 4000, // オーバーレイフェードアウト時間
  COUNTER_TRANSITION: 300, // カウンタートランジション時間
} as const;

// 計算による時間（ミリ秒）
export const CALCULATED_DURATIONS = {
  // 最長スロットアニメーション時間 + 余裕
  TOTAL_TIMEOUT: Math.max(...Object.values(SLOT_ANIMATION_DURATIONS)) * 1000 + 900,
} as const;

// CSS変数用の時間値（文字列）
export const CSS_DURATIONS = {
  SLOT_SPIN_0: `${SLOT_ANIMATION_DURATIONS.DIGIT_0}s`,
  SLOT_SPIN_1: `${SLOT_ANIMATION_DURATIONS.DIGIT_1}s`,
  SLOT_SPIN_2: `${SLOT_ANIMATION_DURATIONS.DIGIT_2}s`,
  OVERLAY_FADE: `${FADE_DURATIONS.OVERLAY_FADE / 1000}s`,
  COUNTER_TRANSITION: `${FADE_DURATIONS.COUNTER_TRANSITION / 1000}s`,
} as const;
