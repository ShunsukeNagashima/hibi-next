import { globalStyle, keyframes, style } from '@vanilla-extract/css';

const slideIn = keyframes({
  from: {
    transform: 'translateX(100%)',
  },
  to: {
    transform: 'translateX(0)',
  },
});

const slideOut = keyframes({
  from: {
    transform: 'translateX(0)',
  },
  to: {
    transform: 'translateX(100%)',
  },
});

export const overlay = style({
  position: 'fixed',
  inset: 0,
  background: '#000A02',
  zIndex: 999999,
  pointerEvents: 'none',
  transition: 'none',
});

export const hidden = style({
  transform: 'translateX(100%)',
  transition: 'none',
});

export const slidingIn = style({
  animation: `${slideIn} 0.9s cubic-bezier(0.8, 0, 0.2, 1) forwards`,
});

export const slidingOut = style({
  animation: `${slideOut} 0.9s cubic-bezier(0.8, 0, 0.2, 1) forwards`,
});

export const forceVisible = style({
  transform: 'translateX(0)',
  transition: 'none',
  opacity: 1,
  display: 'block',
  visibility: 'visible',
});

// Global styles for page transition control
globalStyle('html', {
  visibility: 'hidden',
  height: '100%',
});

globalStyle('body', {
  visibility: 'hidden',
  overflow: 'hidden',
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  margin: 0,
  padding: 0,
});

// ページ準備完了時の表示状態
globalStyle('body.page-ready', {
  visibility: 'visible',
  overflow: 'visible',
  position: 'relative',
  top: 'auto',
  left: 'auto',
  width: 'auto',
  height: 'auto',
});

// ページ遷移中の制御
globalStyle('body.page-ready.page-transitioning', {
  overflow: 'hidden',
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
});

// 遷移中はオーバーレイ以外を非表示
globalStyle('body.page-ready.page-transitioning *', {
  visibility: 'hidden',
});

// オーバーレイのみ表示
globalStyle('body.page-ready.page-transitioning #page-transition-overlay', {
  visibility: 'visible',
});
