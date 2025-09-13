import { keyframes, style } from '@vanilla-extract/css';

export const hero = style({
  position: 'relative',
  width: '100vw',
  height: '100%',
  overflow: 'visible',
  '@media': {
    '(max-width: 768px)': {
      width: '100vw',
      minWidth: '390px',
    },
  },
});

export const logoContainer = style({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: 2,
  opacity: 0,
  transition: 'opacity 0.5s ease-in-out',
});

export const show = style({
  opacity: 1,
});

export const scrollIndicator = style({
  position: 'absolute',
  left: 0,
  top: '50%',
  transform: 'translateY(-50%)',
  zIndex: 2,
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  opacity: 0,
  transition: 'opacity 1s ease-in-out',
  '@media': {
    '(max-width: 768px)': {
      left: 0,
      top: '50%',
      transform: 'translateY(-50%)',
    },
  },
});

export const scrollBar = style({
  position: 'relative',
  width: '104px',
  height: '1px',
  '@media': {
    '(max-width: 768px)': {
      width: '52px',
      background: 'transparent',
    },
  },
});

const scrollSuggestions = keyframes({
  '0%': {
    width: '0%',
    left: 'auto',
    right: 0,
  },
  '50%': {
    width: '100%',
    left: 'auto',
    right: 0,
  },
  '50.01%': {
    width: '100%',
    left: 0,
    right: 'auto',
  },
  '100%': {
    width: '0%',
    left: 0,
    right: 'auto',
  },
});

export const scrollProgress = style({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '1px',
  background: '#000a02',
  transformOrigin: 'left center',
  animation: `${scrollSuggestions} 1.6s cubic-bezier(0.65, 0, 0.35, 1) infinite`,
});

export const scrollProgressCss = style({
  '@supports': {
    'not (animation-timeline: scroll())': {
      animation: 'none',
      background: '#000a02',
    },
  },
});
