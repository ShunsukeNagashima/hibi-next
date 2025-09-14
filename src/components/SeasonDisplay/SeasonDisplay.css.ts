import { style } from '@vanilla-extract/css';
import { verticalTextJp } from '../../styles/common.css';

export const season = style([
  verticalTextJp,
  {
    fontSize: '16px',
    fontWeight: 600,
  },
]);
