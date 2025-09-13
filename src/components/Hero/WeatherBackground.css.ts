import { style } from '@vanilla-extract/css';

export const backgroundContainer = style({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: 0,
  opacity: 0,
  transition: 'opacity 2.5s ease-in-out',
});

export const show = style({
  opacity: 1,
});

export const backgroundImage = style({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  opacity: 0,
  transition: 'opacity 2.5s ease-in-out',
});

export const loaded = style({
  opacity: 1,
});

export const desktop = style({
  display: 'block',
  '@media': {
    '(max-width: 768px)': {
      display: 'none',
    },
  },
});

export const mobile = style({
  display: 'none',
  '@media': {
    '(max-width: 768px)': {
      display: 'block',
    },
  },
});
