import { style } from '@vanilla-extract/css';

export const indexLabel = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '16px',
  width: '20px',
});

export const labelLine = style({
  width: '100%',
  height: '1px',
  background: 'var(--color-primary)',
});

export const labelText = style({
  fontSize: '20px',
  fontWeight: 'normal',
});
