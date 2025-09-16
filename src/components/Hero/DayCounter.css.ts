import { keyframes, style } from '@vanilla-extract/css';

export const dayCounterWrapper = style({
  margin: 0,
  padding: 0,
  fontFamily: '"Shippori Mincho B1", serif',
  color: '#fcfaf2',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
});

export const counterContainer = style({
  fontSize: '24px',
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
});

export const slotContainer = style({
  position: 'relative',
  height: '36px',
  overflow: 'hidden',
  display: 'inline-flex',
  fontWeight: 'semi-bold',
  width: '48px', // 3桁の数字に対応する固定幅（16px × 3）
  minWidth: '48px',
});

export const digitSlot = style({
  position: 'relative',
  width: '16px',
  height: '36px',
  overflow: 'hidden',
  mask: 'linear-gradient(to bottom, transparent 0%, black 35%, black 65%, transparent 100%)',
  WebkitMask: 'linear-gradient(to bottom, transparent 0%, black 35%, black 65%, transparent 100%)',
});

export const digitColumn = style({
  position: 'absolute',
  top: 0,
  width: '100%',
  transform: 'translateY(120px)',
  vars: {
    '--target-position': '-252px',
  },
  opacity: 0.5,
});

const slotSpin0 = keyframes({
  '0%': {
    transform: 'translateY(120px)',
    opacity: 0.5,
  },
  '75%': {
    transform: 'translateY(var(--target-position))',
    opacity: 0.5,
  },
  '100%': {
    transform: 'translateY(var(--target-position))',
    opacity: 1,
  },
});

const slotSpin1 = keyframes({
  '0%': {
    transform: 'translateY(120px)',
    opacity: 0.5,
  },
  '75%': {
    transform: 'translateY(var(--target-position))',
    opacity: 0.5,
  },
  '100%': {
    transform: 'translateY(var(--target-position))',
    opacity: 1,
  },
});

const slotSpin2 = keyframes({
  '0%': {
    transform: 'translateY(120px)',
    opacity: 0.5,
  },
  '75%': {
    transform: 'translateY(var(--target-position))',
    opacity: 0.5,
  },
  '100%': {
    transform: 'translateY(var(--target-position))',
    opacity: 1,
  },
});

export const animate0 = style({
  animation: `${slotSpin0} var(--slot-spin-0-duration, 4.1s) ease-out forwards`,
});

export const animate1 = style({
  animation: `${slotSpin1} var(--slot-spin-1-duration, 3.8s) ease-out forwards`,
});

export const animate2 = style({
  animation: `${slotSpin2} var(--slot-spin-2-duration, 3.7s) ease-out forwards`,
});

export const digit = style({
  display: 'block',
  textAlign: 'center',
  height: '36px',
  overflow: 'hidden',
  boxSizing: 'border-box',
  fontSize: '24px',
  lineHeight: '36px',
});

export const separator = style({
  fontSize: '24px',
  lineHeight: 1.5,
  opacity: 0.5,
});

export const yearTotal = style({
  fontSize: '24px',
  lineHeight: 1.5,
  opacity: 0.5,
  letterSpacing: '0.05em',
});
