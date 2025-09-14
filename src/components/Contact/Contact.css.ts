import { style } from '@vanilla-extract/css';

export const contact = style({
  height: '100%',
  overflow: 'hidden',
});

export const contactParagraph = style({
  margin: 0,
  whiteSpace: 'pre-wrap',
});

export const content = style({
  display: 'flex',
  flexDirection: 'row-reverse',
  alignItems: 'start',
  gap: '80px',
  padding: '20vh 160px 0',
  height: '70vh',

  '@supports': {
    '(height: 100dvh)': {
      padding: '20dvh 160px 0',
      height: '70dvh',
    },
  },

  '@media': {
    '(max-width: 768px)': {
      padding: '20vh 40px 0',
      gap: '40px',
      height: '70vh',
      overflowX: 'auto',
      overflowY: 'hidden',

      '@supports': {
        '(height: 100dvh)': {
          padding: '20dvh 40px 0',
          height: '70dvh',
        },
      },
    },
  },
});

export const contactSections = style({
  display: 'flex',
  flexDirection: 'row-reverse',
  gap: '24px',
  height: '100%',

  '@media': {
    '(max-width: 768px)': {
      padding: '0 20px',
      height: '100%',
    },
  },
});

export const contactSection = style({
  height: '100%',
  padding: '0 40px',

  '@media': {
    '(max-width: 768px)': {
      width: 'auto',
    },
  },
});

export const sectionContent = style({
  display: 'flex',
  alignItems: 'start',
  justifyContent: 'start',
  gap: '24px',
  height: '100%',
});

export const contentBody = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '40px',
});

export const bodySection = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
});

export const contentBodyParagraph = style({
  fontSize: '16px',
  fontWeight: 400,
  lineHeight: 1.8,
});

export const sectionDivider = style({
  width: '1px',
  height: '24px',
  background: 'var(--color-primary)',
});

export const sectionTitle = style({
  fontSize: '24px',
  fontWeight: 600,
  lineHeight: 1.25,
  width: '24px',
  margin: 0,
});
