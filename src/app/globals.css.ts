import { globalStyle } from '@vanilla-extract/css';

// Reset and Base Styles
globalStyle('*', {
  margin: 0,
  padding: 0,
  boxSizing: 'border-box',
});

globalStyle('html', {
  fontFamily: '"Shippori Mincho B1", serif',
  fontSize: '16px',
  lineHeight: 1.6,
});

globalStyle('body', {
  backgroundColor: '#fcfaf2',
  backgroundImage: 'url("/texture.png")',
  backgroundRepeat: 'repeat',
  color: '#333',
  height: '100dvh',
});

globalStyle('a', {
  color: 'inherit',
  textDecoration: 'none',
});

// Utility Classes
globalStyle('.container', {
  width: '100%',
  maxWidth: '1470px',
  margin: '0 auto',
  padding: '0 20px',
  '@media': {
    '(min-width: 768px)': {
      padding: '0 40px',
    },
    '(min-width: 1024px)': {
      padding: '0 160px',
    },
  },
});

// Vertical text utility classes
globalStyle('.vertical-text-jp', {
  writingMode: 'vertical-rl',
  textOrientation: 'mixed',
  letterSpacing: '0.25em',
});

globalStyle('.vertical-text-en', {
  writingMode: 'vertical-rl',
  textOrientation: 'mixed',
});

globalStyle('.vertical-text-centered', {
  writingMode: 'vertical-rl',
  textOrientation: 'mixed',
  letterSpacing: '0.25em',
  marginRight: 'auto',
  marginLeft: 'auto',
});

// Color variables
globalStyle(':root', {
  vars: {
    '--color-primary': '#000a02',
    '--color-background': '#fcfaf2',
    '--color-white': '#fffffd',
  },
});
