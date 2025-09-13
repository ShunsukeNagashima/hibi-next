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

globalStyle('img', {
  maxWidth: '100%',
  height: 'auto',
  display: 'block',
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
