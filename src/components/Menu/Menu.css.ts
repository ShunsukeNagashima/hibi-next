import { style } from '@vanilla-extract/css';

export const menuOverlay = style({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  zIndex: 2000,
  pointerEvents: 'none',
  visibility: 'hidden',
  opacity: 0,
  transition: `visibility 0s linear 0.4s, opacity 0.4s ease`,
  userSelect: 'none',
  WebkitUserSelect: 'none',
});

export const menuOverlayOpen = style({
  pointerEvents: 'auto',
  visibility: 'visible',
  opacity: 1,
  transitionDelay: '0s',
});

export const menuBackdrop = style({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0)',
  zIndex: 1,
  border: 'none',
  padding: 0,
  cursor: 'pointer',
  transition: 'background-color 0.4s ease',
});

export const menuBackdropOpen = style({
  backgroundColor: 'rgba(0, 0, 0, 0.3)',
});

export const menuContent = style({
  position: 'absolute',
  top: 0,
  right: 0,
  width: '880px',
  height: '100%',
  backgroundColor: '#fffffd',
  display: 'flex',
  justifyContent: 'end',
  gap: '40px',
  transform: 'translateX(100%)',
  transition: 'transform 0.9s cubic-bezier(0.8, 0, 0.2, 1)',
  zIndex: 2,
  opacity: 1,
  '@media': {
    '(max-width: 768px)': {
      right: 0,
      width: '100vw',
      padding: 0,
      gap: '40px',
    },
  },
});

export const menuContentOpen = style({
  transform: 'translateX(0)',
});

export const menuList = style({
  display: 'flex',
  flexDirection: 'row-reverse',
  alignItems: 'start',
  justifyContent: 'start',
  gap: '16px',
  padding: '160px 0',
  '@media': {
    '(max-width: 768px)': {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gridTemplateRows: 'repeat(2, 1fr)',
      gap: '4px',
      justifyContent: 'center',
      alignItems: 'start',
      height: '100%',
      maxWidth: '300px',
      boxSizing: 'border-box',
    },
  },
});

export const menuItem = style({
  display: 'flex',
  alignItems: 'start',
  justifyContent: 'center',
  padding: '0 24px',
  height: '100%',
  cursor: 'pointer',
  transition: 'opacity 0.2s ease',
  background: 'none',
  border: 'none',
  color: 'inherit',
  fontFamily: 'inherit',
  textDecoration: 'none',
  userSelect: 'none',
  WebkitUserSelect: 'none',
  outline: 'none',

  '@media': {
    '(max-width: 768px)': {
      padding: '16px',
      height: 'auto',
      alignItems: 'center',
      justifyContent: 'center',
      flex: '0 0 auto',
      width: '52px',
      boxSizing: 'border-box',
    },
  },
});

export const menuItemJp = style({
  fontSize: '24px',
  fontWeight: 600,
  lineHeight: 1.25,
  width: '24px',
  margin: 0,
  writingMode: 'vertical-rl',
  textOrientation: 'mixed',
  letterSpacing: '0.25em',
  userSelect: 'none',
  WebkitUserSelect: 'none',
  '@media': {
    '(max-width: 768px)': {
      fontSize: '20px',
      width: '20px',
    },
  },
});

export const menuClose = style({
  display: 'flex',
  flexDirection: 'column',
  padding: '80px',
  height: '100%',
  '@media': {
    '(max-width: 768px)': {
      padding: '40px 24px',
      height: '100%',
    },
  },
});

export const closeButton = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '8px',
  width: '16px',
  cursor: 'pointer',
  transition: 'opacity 0.2s ease',
  background: 'none',
  border: 'none',
  color: 'inherit',
  fontFamily: 'inherit',
  padding: 0,
  userSelect: 'none',
  WebkitUserSelect: 'none',
  outline: 'none',
});

export const closeSymbol = style({
  fontSize: '16px',
  fontWeight: 600,
  lineHeight: 1.25,
});

export const closeText = style({
  fontSize: '16px',
  fontWeight: 600,
  lineHeight: 1.25,
  writingMode: 'vertical-rl',
  textOrientation: 'mixed',
  letterSpacing: '0.25em',
  userSelect: 'none',
  WebkitUserSelect: 'none',
});

// Grid positioning classes for mobile layout
export const menuItem1 = style({
  '@media': {
    '(max-width: 768px)': {
      gridArea: '1 / 3 / 2 / 4',
    },
  },
});

export const menuItem2 = style({
  '@media': {
    '(max-width: 768px)': {
      gridArea: '2 / 3 / 3 / 4',
    },
  },
});

export const menuItem3 = style({
  '@media': {
    '(max-width: 768px)': {
      gridArea: '1 / 2 / 2 / 3',
    },
  },
});

export const menuItem4 = style({
  '@media': {
    '(max-width: 768px)': {
      gridArea: '2 / 2 / 3 / 3',
    },
  },
});

export const menuItem5 = style({
  '@media': {
    '(max-width: 768px)': {
      gridArea: '1 / 1 / 2 / 2',
    },
  },
});
