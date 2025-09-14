import { globalStyle, style } from '@vanilla-extract/css';

export const worksList = style({
  height: '100%',
  overflow: 'hidden',
});

export const content = style({
  height: '70vh',
  display: 'flex',
  flexDirection: 'row-reverse',
  alignItems: 'start',
  gap: '40px',
  padding: '20vh 160px 0',

  '@supports': {
    '(height: 100dvh)': {
      height: '70dvh',
      padding: '20dvh 160px 0',
    },
  },

  '@media': {
    '(max-width: 768px)': {
      padding: '20vh 40px 0',
      gap: '40px',
      height: '70vh',

      '@supports': {
        '(height: 100dvh)': {
          padding: '20dvh 40px 0',
          height: '70dvh',
        },
      },
    },
  },
});

export const worksSections = style({
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'nowrap',
  gap: 0,
  width: 'fit-content',
  overflow: 'visible',

  '@media': {
    '(max-width: 768px)': {
      gap: 0,
    },
  },
});

export const workSection = style({
  display: 'flex',
  alignItems: 'center',
  height: '70vh',

  '@supports': {
    '(height: 100dvh)': {
      height: '70dvh',
    },
  },

  '@media': {
    '(max-width: 768px)': {
      height: '70vh',

      '@supports': {
        '(height: 100dvh)': {
          height: '70dvh',
        },
      },
    },
  },
});

export const sectionWithMargin = style({
  '@media': {
    '(max-width: 768px)': {
      paddingLeft: '40px',
    },
  },
});

export const caseIndex = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  padding: '0 20px',
  height: '100%',
  width: '112px',
  flexShrink: 0,
  justifyContent: 'start',
  alignItems: 'center',
  position: 'relative',
});

globalStyle(`${caseIndex}::after`, {
  content: '""',
  position: 'absolute',
  right: 0,
  top: '-20vh',
  bottom: '-10vh',
  width: '1px',
  background: '#000A02',
});

globalStyle(`${caseIndex}::after`, {
  '@supports': {
    '(height: 100dvh)': {
      top: '-20dvh',
      bottom: '-10dvh',
    },
  },
});

export const categoryJp = style({
  fontSize: '32px',
  fontWeight: 600,
  color: '#000A02',
  lineHeight: 1.25,
});

export const categoryEn = style({
  fontSize: '20px',
  fontWeight: 400,
  color: '#000A02',
  lineHeight: 1.5,
  letterSpacing: '0.05em',
  width: '32px',
  height: '130px',
});
