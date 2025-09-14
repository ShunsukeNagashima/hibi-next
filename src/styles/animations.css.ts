import { globalStyle, keyframes, style } from '@vanilla-extract/css';

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
  transition: 'transform 0.5s linear',
  animationDuration: '1.5s',
  animationFillMode: 'both',
});

// 初期状態
globalStyle('.inview-blur', {
  opacity: 0,
  transition: 'transform 0.5s linear',
  animationDuration: '1.5s',
  animationFillMode: 'both',
});

// アニメーション適用状態 (.blur クラスが追加されたとき)
globalStyle('.blur', {
  animationName: imageBlur,
  opacity: 1,
  transition: '0.8s',
});
