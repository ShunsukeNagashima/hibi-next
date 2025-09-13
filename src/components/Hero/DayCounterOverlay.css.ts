import { style } from '@vanilla-extract/css';

export const overlay = style({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  zIndex: 10001,
  backgroundColor: '#000000',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  opacity: 1,
  transition: 'opacity var(--overlay-fade-duration, 2s) ease-out',
});

export const fadeOut = style({
  opacity: 0,
});

export const counterWrapper = style({
  opacity: 1,
  transition: 'opacity var(--counter-transition-duration, 0.3s) ease-out',
});

export const counterFadeOut = style({
  opacity: 0,
});
