import { style } from '@vanilla-extract/css';

export const footer = style({
  backgroundColor: 'var(--color-primary)',
  backgroundImage: 'url("/footer-background.svg")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  color: 'var(--color-white)',
  height: '100dvh',
  width: '384px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexShrink: 0,
  '@media': {
    '(max-width: 768px)': {
      width: '100vw',
      minWidth: '390px',
      height: '100dvh',
    },
  },
});

export const footerContent = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '60px',
  width: '100%',
  paddingTop: '30dvh',
  '@media': {
    '(max-width: 768px)': {
      alignItems: 'center',
      paddingTop: '20dvh',
    },
  },
});

export const logoSection = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '60px',
});

export const logo = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const logoButton = style({
  background: 'none',
  border: 'none',
  padding: 0,
  cursor: 'pointer',
});

export const backToTop = style({
  fontSize: '16px',
  fontWeight: 400,
  lineHeight: 1.25,
  textAlign: 'center',
  width: 'auto',
  cursor: 'pointer',
  userSelect: 'none',
  background: 'none',
  border: 'none',
  color: 'inherit',
  fontFamily: 'inherit',
  padding: 0,
  height: '120px',
});

export const arrowHorizontal = style({
  writingMode: 'horizontal-tb',
});

export const copyright = style({
  fontSize: '10px',
  fontWeight: 400,
  lineHeight: 1.25,
  letterSpacing: '0.05em',
  textAlign: 'center',
  paddingBottom: '12px',
});
