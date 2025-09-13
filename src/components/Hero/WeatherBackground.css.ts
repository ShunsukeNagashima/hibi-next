// WeatherBackground.css.ts
import { style } from '@vanilla-extract/css';

export const background = style({
  position: 'absolute',
  top: 0,
  right: 0,
  pointerEvents: 'none',
  zIndex: 0,
  opacity: 0,
  transition: 'opacity 2.5s ease-in-out',
});

export const backgroundShow = style({
  opacity: 1,
});

const backgroundImageBase = style({
  height: '100vh',
  width: 'auto',
  '@supports': {
    '(height: 100dvh)': {
      height: '100dvh',
    },
  },
});

export const backgroundDesktop = style([
  backgroundImageBase,
  {
    display: 'block',
    '@media': {
      '(max-width: 768px)': {
        display: 'none',
      },
    },
  },
]);

export const backgroundMobile = style([
  backgroundImageBase,
  {
    display: 'none',
    '@media': {
      '(max-width: 768px)': {
        display: 'block',
      },
    },
  },
]);
