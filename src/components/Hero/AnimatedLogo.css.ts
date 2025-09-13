import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  background: 'transparent',
});

export const logoWrapper = style({
  position: 'relative',
  width: 'auto',
  height: '192px',
  '@media': {
    '(max-width: 768px)': {
      height: '140px',
    },
  },
});

export const logoSvg = style({
  width: 'auto',
  height: '192px',
  '@media': {
    '(max-width: 768px)': {
      height: '140px',
    },
  },
});

export const logoPath = style({
  fill: '#000a02',
});
