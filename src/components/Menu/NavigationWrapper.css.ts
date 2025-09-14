import { globalStyle, style } from '@vanilla-extract/css';

export const menuButton = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '8px',
  fontSize: '16px',
  fontWeight: 600,
  cursor: 'pointer',
  background: 'none',
  border: 'none',
  padding: 0,
  color: 'inherit',
  fontFamily: 'inherit',
  opacity: 0,
  transition: 'opacity 0.3s ease',
});

export const menuButtonShow = style({
  opacity: 1,
});

// 元のCSSの .menu-button span に相当するスタイル
globalStyle(`${menuButton} span`, {
  marginRight: 'auto',
  marginLeft: 'auto',
});

export const iconWrapper = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '16px',
  height: '24px',
});

export const menuIcon = style({
  width: '8px',
  height: '8px',
  background: 'var(--color-primary)',
  borderRadius: '50%',
});
