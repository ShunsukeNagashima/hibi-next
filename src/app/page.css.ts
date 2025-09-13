import { style } from '@vanilla-extract/css';

export const page = style({
  display: 'grid',
  gridTemplateRows: '20px 1fr 20px',
  alignItems: 'center',
  justifyItems: 'center',
  minHeight: '100vh',
  padding: '80px',
  gap: '64px',
  fontFamily: 'var(--font-geist-sans)',
});

export const main = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '32px',
  gridRow: 2,
  alignItems: 'center',
});

export const logo = style({
  filter: 'invert(1)',
});

export const ctas = style({
  display: 'flex',
  gap: '16px',
});

export const primary = style({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  backgroundColor: 'foreground',
  color: 'background',
  borderRadius: '128px',
  padding: '12px 20px',
  fontSize: '14px',
  fontWeight: 500,
  textDecoration: 'none',
  transition: 'background 0.2s, transform 0.2s',
  ':hover': {
    backgroundColor: '#383838',
    transform: 'scale(1.05)',
  },
});

export const secondary = style({
  borderRadius: '128px',
  border: '1px solid rgba(var(--foreground-rgb), 0.2)',
  padding: '12px 20px',
  fontSize: '14px',
  fontWeight: 500,
  textDecoration: 'none',
  transition: 'background 0.2s, transform 0.2s',
  ':hover': {
    backgroundColor: 'rgba(var(--foreground-rgb), 0.05)',
    borderColor: 'rgba(var(--foreground-rgb), 0.3)',
    transform: 'scale(1.05)',
  },
});

export const footer = style({
  gridRow: 3,
  display: 'flex',
  gap: '24px',
  flexWrap: 'wrap',
});
