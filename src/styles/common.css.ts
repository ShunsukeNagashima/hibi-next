import { style } from '@vanilla-extract/css';

// Vertical text styles
export const verticalTextJp = style({
  writingMode: 'vertical-rl',
  textOrientation: 'mixed',
  letterSpacing: '0.25em',
});

export const verticalTextEn = style({
  writingMode: 'vertical-rl',
  textOrientation: 'mixed',
});

export const verticalTextCentered = style({
  writingMode: 'vertical-rl',
  textOrientation: 'mixed',
  letterSpacing: '0.25em',
  marginRight: 'auto',
  marginLeft: 'auto',
});

// Common hover effect
export const hoverFade = style({
  transition: 'opacity 0.2s ease',
  ':hover': {
    opacity: 0.7,
  },
});

// Color variables
export const colors = {
  primary: '#000a02',
  background: '#fcfaf2',
  white: '#fffffd',
} as const;
