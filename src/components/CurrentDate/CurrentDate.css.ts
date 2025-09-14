import { style } from '@vanilla-extract/css';
import { verticalTextJp } from '../../styles/common.css';

export const date = style([
  verticalTextJp,
  {
    fontSize: '16px',
    fontWeight: 600,
    color: 'var(--color-primary)',
    lineHeight: 1.4,
  },
]);
