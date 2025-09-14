'use client';

import { useEffect } from 'react';

export function useBlurAnimation() {
  useEffect(() => {
    const scrollContainer = document.getElementById('scroll-container');

    if (!scrollContainer) {
      return;
    }

    function handleScroll() {
      const elements = document.querySelectorAll('.inview-blur');

      elements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const elementLeft = rect.left;
        const elementRight = rect.right;
        const windowWidth = window.innerWidth;

        if (elementLeft < windowWidth && elementRight > 0 && !element.classList.contains('blur')) {
          element.classList.add('blur');
        }
      });
    }

    scrollContainer.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
    };
  }, []);
}
