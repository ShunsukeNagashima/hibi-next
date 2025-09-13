import { style } from '@vanilla-extract/css';

export const about = style({
  height: '100%',
  overflow: 'hidden',
  '@media': {
    '(max-width: 768px)': {
      minWidth: '390px',
    },
  },
});

export const content = style({
  height: '100vh',
  display: 'flex',
  flexDirection: 'row-reverse',
  gap: '120px',
  margin: '20vh 160px 0',
  '@supports': {
    '(height: 100dvh)': {
      height: '70dvh',
      margin: '20dvh 160px 0',
    },
  },
  '@media': {
    '(max-width: 768px)': {
      height: '70vh',
      margin: '20vh 40px 0',
      gap: '40px',
      minWidth: 'max-content',
      '@supports': {
        '(height: 100dvh)': {
          height: '70dvh',
          margin: '20dvh 40px 0',
        },
      },
    },
  },
});

export const textContent = style({
  minHeight: '900px',
  display: 'flex',
  alignItems: 'start',
  justifyContent: 'center',
  '@media': {
    '(max-width: 768px)': {
      gap: '40px',
    },
  },
});

export const textContentParagraph = style({
  fontSize: '18px',
  fontWeight: 400,
  lineHeight: '50px',
  whiteSpace: 'pre-line',
  letterSpacing: '0.35rem',
  '@media': {
    '(max-width: 768px)': {
      fontSize: '16px',
    },
  },
});

export const title = style({
  fontSize: '32px',
  fontWeight: 600,
  width: '32px',
  height: '100%',
  display: 'flex',
  alignItems: 'start',
  justifyContent: 'start',
  lineHeight: 1.25,
});

export const owners = style({
  display: 'flex',
  gap: '16px',
  alignSelf: 'end',
});

export const owner = style({
  fontSize: '18px',
  fontWeight: 400,
  opacity: 0.7,
  margin: 0,
  lineHeight: 1.5,
});
