import { style } from '@vanilla-extract/css';

export const gallerySection = style({
  height: '100%',
  overflow: 'hidden',

  '@media': {
    '(max-width: 768px)': {
      minWidth: 'max-content',
    },
  },
});

export const gallery = style({
  margin: '15vh 240px 0',
  height: '70vh',
  display: 'flex',
  flexDirection: 'row-reverse',
  alignItems: 'center',
  gap: '240px',
  justifyContent: 'center',
  '@supports': {
    '(height: 100dvh)': {
      margin: '15dvh 240px 0',
      height: '70dvh',
    },
  },

  '@media': {
    '(max-width: 768px)': {
      margin: '10vh 240px 0',
      gap: '120px',
      height: '80vh',
      '@supports': {
        '(height: 100dvh)': {
          margin: '10dvh 240px 0',
          height: '80dvh',
        },
      },
    },
  },
});

export const gallerySet = style({
  display: 'flex',
  flexDirection: 'row-reverse',
  gap: '80px',

  '@media': {
    '(max-width: 768px)': {
      gap: '40px',
    },
  },
});

export const galleryImage = style({
  objectFit: 'cover',
  height: '70vh',
  width: 'auto',
  '@supports': {
    '(height: 100dvh)': {
      height: '70dvh',
    },
  },

  '@media': {
    '(max-width: 768px)': {
      height: '80vh',
      width: 'auto',
      '@supports': {
        '(height: 100dvh)': {
          height: '80dvh',
        },
      },
    },
  },
});

export const imageContainer = style({
  height: '70vh',
  '@supports': {
    '(height: 100dvh)': {
      height: '70dvh',
    },
  },

  '@media': {
    '(max-width: 768px)': {
      height: '80vh',
      '@supports': {
        '(height: 100dvh)': {
          height: '80dvh',
        },
      },
    },
  },
});

export const grayscale = style({
  filter: 'grayscale(100%)',
});

export const galleryLink = style({
  display: 'block',
  height: '70vh',
  cursor: 'pointer',
  '@supports': {
    '(height: 100dvh)': {
      height: '70dvh',
    },
  },

  '@media': {
    '(max-width: 768px)': {
      height: '80vh',
      '@supports': {
        '(height: 100dvh)': {
          height: '80dvh',
        },
      },
    },
  },
});
