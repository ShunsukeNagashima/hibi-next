import { globalStyle, keyframes, style } from '@vanilla-extract/css';
import { ANIMATION_PRESETS, CSS_DURATIONS } from '../constants/animations';

const imageBlur = keyframes({
  from: {
    opacity: 0,
    filter: 'blur(15px)',
  },
  to: {
    opacity: 1,
    filter: 'blur(0px)',
  },
});

export const inviewBlur = style({
  opacity: 0,
  transition: ANIMATION_PRESETS.BLUR_TRANSFORM,
  animationDuration: CSS_DURATIONS.BLUR_ANIMATION,
  animationFillMode: 'both',
});

// 初期状態
globalStyle('.inview-blur', {
  opacity: 0,
  transition: ANIMATION_PRESETS.BLUR_TRANSFORM,
  animationDuration: CSS_DURATIONS.BLUR_ANIMATION,
  animationFillMode: 'both',
});

// アニメーション適用状態 (.blur クラスが追加されたとき)
globalStyle('.blur', {
  animationName: imageBlur,
  opacity: 1,
  transition: CSS_DURATIONS.GENERAL_TRANSITION,
});
