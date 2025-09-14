import { globalStyle, style } from '@vanilla-extract/css';

export const caseContent = style({
  display: 'flex',
  flexDirection: 'row-reverse',
  alignItems: 'stretch',
  gap: 0,
  padding: 0,
  height: '100%',
  flexWrap: 'nowrap',
});

export const caseList = style({
  display: 'flex',
  flexDirection: 'row-reverse',
  gap: '24px',
  padding: '0 40px',
  height: '100%',
  alignItems: 'stretch',
  flexShrink: 0,
  position: 'relative',
});

export const caseListWithBorder = style({});

globalStyle(`${caseListWithBorder}::before`, {
  content: '""',
  position: 'absolute',
  left: 0,
  top: 0,
  bottom: '-10vh',
  width: '1px',
  background: `repeating-linear-gradient(
    to bottom,
    var(--color-primary) 0,
    var(--color-primary) 5px,
    transparent 5px,
    transparent 10px
  )`,
});

globalStyle(`${caseListWithBorder}::before`, {
  '@supports': {
    '(height: 100dvh)': {
      bottom: '-10dvh',
    },
  },
});

export const workDescription = style({
  fontSize: '16px',
  fontWeight: 400,
  lineHeight: 2,
  display: 'flex',
  whiteSpace: 'pre-line',
});

export const workSubtitle = style({
  fontSize: '16px',
  fontWeight: 400,
  lineHeight: 2,
  display: 'flex',
});

export const workTitle = style({
  fontSize: '24px',
  width: '32px',
  textAlign: 'center',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  textDecoration: 'none',
  color: 'inherit',
  cursor: 'pointer',
});

export const arrow = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '24px',
  writingMode: 'vertical-rl',
});

export const viewMore = style({
  display: 'flex',
  alignItems: 'start',
  justifyContent: 'start',
  height: '70vh',
  padding: '0 40px',
  fontSize: '16px',
  fontWeight: 400,
  fontFamily: 'inherit',
  color: 'var(--color-primary)',
  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',
  opacity: 1,
  transition: 'opacity 0.2s ease',
  writingMode: 'vertical-rl',

  '@supports': {
    '(height: 100dvh)': {
      height: '70dvh',
    },
  },

  ':hover': {
    opacity: 0.7,
  },

  ':disabled': {
    cursor: 'not-allowed',
    opacity: 0.5,
  },
});
