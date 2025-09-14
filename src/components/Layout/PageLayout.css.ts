import { globalStyle, style } from '@vanilla-extract/css';

export const pageContainer = style({
  width: '100vw',
  height: '100vh',
  overflow: 'hidden',
  color: 'var(--color-primary)',
  '@supports': {
    '(height: 100dvh)': {
      height: '100dvh',
    },
  },
});

export const horizontalScroll = style({
  display: 'flex',
  width: '100%',
  height: '100vh',
  overflowX: 'auto',
  overflowY: 'hidden',
  scrollBehavior: 'auto',
  direction: 'rtl',
  scrollbarWidth: 'thin',
  scrollbarColor: '#000A02 #FFFFD',
  WebkitOverflowScrolling: 'touch',
  '@supports': {
    '(height: 100dvh)': {
      height: '100dvh',
    },
  },
  '@media': {
    '(max-width: 768px)': {
      msOverflowStyle: 'none',
      scrollbarWidth: 'none',
      '::-webkit-scrollbar': {
        height: 0,
        width: 0,
        background: 'transparent',
      },
    },
  },
  '::-webkit-scrollbar-track': {
    background: '#FFFFD',
  },
  '::-webkit-scrollbar-thumb': {
    background: '#000A02',
    borderRadius: 0,
  },
});

// Global style for all direct children of horizontal scroll (except footer)
globalStyle('.horizontal-scroll > *:not([data-section="footer"])', {
  flexShrink: 0,
  height: '100%',
  direction: 'ltr',
  backgroundColor: 'rgba(252, 250, 242, 0.5)',
  backgroundImage: 'url("/texture.png")',
  backgroundRepeat: 'repeat',
});

// Apply basic layout styles to footer too (without background)
globalStyle('.horizontal-scroll > [data-section="footer"]', {
  flexShrink: 0,
  height: '100%',
  direction: 'ltr',
});

export const horizontalScrollChild = style({
  flexShrink: 0,
  height: '100%',
  direction: 'ltr',
  backgroundColor: 'rgba(252, 250, 242, 0.5)',
  backgroundImage: 'url("/texture.png")',
  backgroundRepeat: 'repeat',
});
