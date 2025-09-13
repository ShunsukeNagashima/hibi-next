import { forwardRef, useId } from 'react';
import * as styles from './AnimatedLogo.css';

export const AnimatedLogo = forwardRef<SVGAnimateElement>((_props, ref) => {
  const gradientMaskId = useId();
  const fractalRevealId = useId();
  const logoAnimationId = useId();

  return (
    <div className={styles.container}>
      <div className={styles.logoWrapper}>
        <svg
          className={styles.logoSvg}
          width="299"
          height="573"
          viewBox="0 0 299 573"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Hibi Logo"
        >
          <defs>
            {/* 軽量化されたグラデーションマスク */}
            <mask id={gradientMaskId}>
              {/* メインのフラクタルノイズ（軽量・断片的） */}
              <filter id={fractalRevealId} x="-20%" y="-20%" width="140%" height="140%">
                <feTurbulence
                  type="turbulence"
                  baseFrequency="0.01"
                  numOctaves="2"
                  seed="5"
                  result="noise"
                />

                {/* 断片的な表示のための閾値処理（軽量版） */}
                <feComponentTransfer in="noise" result="processed">
                  <feFuncA type="discrete" tableValues="0 0 0 0 0 0 0">
                    <animate
                      attributeName="tableValues"
                      dur="4s"
                      values="0 0 0 0 1 1 1;
                              0 0 0 1 1 1 1;
                              0 0 1 1 1 1 1;
                              0 1 1 1 1 1 1;
                              1 1 1 1 1 1 1"
                      fill="freeze"
                      begin={`${logoAnimationId}.begin`}
                    />
                  </feFuncA>
                </feComponentTransfer>

                {/* 軽量なぼかし */}
                <feGaussianBlur in="processed" stdDeviation="1.5" result="blurred" />
              </filter>

              {/* フラクタルノイズマスク適用 */}
              <rect
                x="0"
                y="0"
                width="299"
                height="573"
                fill="white"
                filter={`url(#${fractalRevealId})`}
                opacity="0"
              >
                <animate
                  attributeName="opacity"
                  dur="0.01s"
                  values="0;1"
                  fill="freeze"
                  begin={`${logoAnimationId}.begin`}
                />
              </rect>

              {/* 補助的な全体フェード（より遅く） */}
              <rect x="0" y="0" width="299" height="573" fill="white" opacity="0">
                <animate
                  attributeName="opacity"
                  dur="4s"
                  values="0;0;0;0.2;0.5;0.8;1"
                  keyTimes="0;0.15;0.3;0.5;0.7;0.85;1"
                  fill="freeze"
                  begin={`${logoAnimationId}.begin`}
                />
              </rect>
            </mask>
          </defs>

          {/* マスクを適用してSVGを埋め込み */}
          <g mask={`url(#${gradientMaskId})`}>
            <image href="hibi-logo-black.svg" x="0" y="0" width="299" height="573" />
          </g>

          {/* アニメーション開始トリガー用の非表示要素 */}
          <animate
            ref={ref}
            id={logoAnimationId}
            attributeName="opacity"
            dur="0.01s"
            values="1;1"
            fill="freeze"
            begin="indefinite"
          />
        </svg>
      </div>
    </div>
  );
});

AnimatedLogo.displayName = 'AnimatedLogo';
