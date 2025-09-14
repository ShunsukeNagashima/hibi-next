import { globalStyle, style } from '@vanilla-extract/css';

export const workDetail = style({
  display: 'flex',
  flexDirection: 'row-reverse',
  flexGrow: 1,
  paddingRight: '176px',
  '@media': {
    '(max-width: 768px)': {
      paddingRight: '64px',
    },
  },
});

export const sectionContent = style({
  height: '75vh',
  marginTop: '15vh',
  '@supports': {
    '(height: 75dvh)': {
      height: '75dvh',
      marginTop: '15dvh',
    },
  },
});

export const headerContent = style({
  paddingLeft: '80px',
  paddingRight: '80px',
});

export const workTitleSection = style({
  display: 'flex',
  flexDirection: 'row-reverse',
  alignItems: 'start',
  gap: '24px',
  height: '100%',
});

export const workTitle = style({
  fontSize: '32px',
  fontWeight: 700,
  lineHeight: 1.2,
  margin: 0,
  flexGrow: 1,
  '@media': {
    '(max-width: 768px)': {
      fontSize: '24px',
    },
  },
});

export const workSubtitle = style({
  fontSize: '20px',
  fontWeight: 400,
  lineHeight: 1.4,
  margin: 0,
  alignSelf: 'end',
  '@media': {
    '(max-width: 768px)': {
      fontSize: '16px',
    },
  },
});

export const workLocation = style({
  fontSize: '16px',
  fontWeight: 400,
  lineHeight: 1.4,
  margin: 0,
  '@media': {
    '(max-width: 768px)': {
      fontSize: '14px',
    },
  },
});

export const mainImage = style({
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '40px',
  '@media': {
    '(max-width: 768px)': {
      padding: '20px',
    },
  },
});

// コンセプトセクション
export const conceptsContent = style({
  display: 'flex',
  flexDirection: 'row-reverse',
  gap: '120px',
  paddingLeft: '160px',
  paddingRight: '160px',
});

export const conceptSection = style({
  display: 'flex',
  flexDirection: 'row-reverse',
  gap: '40px',
});

export const conceptTitle = style({
  fontSize: '24px',
  fontWeight: 600,
  lineHeight: 2,
  margin: 0,
  whiteSpace: 'pre-line',
});

export const conceptBody = style({
  fontSize: '16px',
  lineHeight: 2,
  margin: 0,
  whiteSpace: 'pre-line',
});

// 関係者セクション
export const contributorsContent = style({
  display: 'flex',
  flexDirection: 'row-reverse',
  alignItems: 'start',
  gap: '120px',
  paddingLeft: '160px',
  paddingRight: '160px',
});

export const contributorList = style({
  display: 'flex',
  flexDirection: 'row-reverse',
  alignItems: 'start',
  gap: '16px',
});

export const contributorGroup = style({
  display: 'flex',
  flexDirection: 'column',
  height: '75vh',
  gap: '8px',
  flexGrow: 1,
  '@supports': {
    '(height: 75dvh)': {
      height: '75dvh',
    },
  },
});

export const contributorRole = style({
  flexShrink: 0,
  fontSize: '18px',
  fontWeight: 600,
  margin: 0,
  lineHeight: 1,
  display: 'flex',
  alignItems: 'center',
});

export const contributorNames = style({
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'wrap',
  gap: 0,
  alignItems: 'center',
  justifyContent: 'start',
  minHeight: '100%',
  direction: 'rtl',
  width: '100%',
});

export const contributorNameWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '8px',
  flexShrink: 0,
});

export const contributorName = style({
  fontSize: '16px',
  lineHeight: 1.6,
  margin: 0,
});

export const separator = style({
  fontSize: '16px',
});

export const contributorColon = style({
  textAlign: 'center',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginLeft: '4px',
});

// 画像ギャラリー
export const galleryContent = style({
  display: 'flex',
  gap: '40px',
  alignItems: 'center',
  paddingLeft: '80px',
  paddingRight: '80px',
});

export const noContributors = style({
  paddingLeft: '320px',
});

export const galleryImage = style({
  flexShrink: 0,
  height: '100%',
});

// グローバルスタイル for img and blur animation
globalStyle('.inview-blur', {
  opacity: 0,
  filter: 'blur(20px)',
  transform: 'scale(1.1)',
  transition: 'opacity 1.2s ease-out, filter 1.2s ease-out, transform 1.2s ease-out',
});

globalStyle('.inview-blur.inview', {
  opacity: 1,
  filter: 'blur(0px)',
  transform: 'scale(1)',
});

globalStyle(`${galleryImage} img`, {
  width: 'auto',
  objectFit: 'contain',
  height: '100%',
});

globalStyle(`${mainImage} img`, {
  maxWidth: '100%',
  maxHeight: '100%',
  objectFit: 'contain',
});
