// Animation duration constants for the application
// Centralized management following the pattern from the Astro version

// Page transition durations (seconds)
export const PAGE_TRANSITION_DURATIONS = {
  SLIDE_ANIMATION: 0.9, // Page slide in/out animation
} as const;

// Blur animation durations (seconds)
export const BLUR_ANIMATION_DURATIONS = {
  TRANSFORM_TRANSITION: 0.5, // Transform transition time
  ANIMATION_DURATION: 1.5, // Main blur animation duration
  GENERAL_TRANSITION: 0.8, // General transition time
} as const;

// Page loading animation durations (milliseconds)
export const PAGE_LOADING_DURATIONS = {
  LOGO_DELAY: 500, // Logo container fade-in delay
  CONTENT_DELAY: 2000, // Weather background and menu display delay
  SCROLL_DELAY: 200, // Scroll navigation delay
  FALLBACK_TIMEOUT: 6000, // Fallback animation timeout
} as const;

// Slot animation durations (seconds) - for day counter
export const SLOT_ANIMATION_DURATIONS = {
  DIGIT_0: 4.1, // 1st digit
  DIGIT_1: 3.8, // 2nd digit
  DIGIT_2: 3.7, // 3rd digit
} as const;

// Fade durations (milliseconds) - for day counter
export const FADE_DURATIONS = {
  COUNTER_FADE: 800, // Counter fade out time
  OVERLAY_FADE: 4000, // Overlay fade out time
  COUNTER_TRANSITION: 300, // Counter transition time
} as const;

// Calculated durations (milliseconds)
export const CALCULATED_DURATIONS = {
  // Longest slot animation time + buffer
  TOTAL_TIMEOUT: Math.max(...Object.values(SLOT_ANIMATION_DURATIONS)) * 1000 + 900,
} as const;

// CSS variable duration values (strings) for direct CSS injection
export const CSS_DURATIONS = {
  // Page transitions
  SLIDE_ANIMATION: `${PAGE_TRANSITION_DURATIONS.SLIDE_ANIMATION}s`,

  // Blur animations
  TRANSFORM_TRANSITION: `${BLUR_ANIMATION_DURATIONS.TRANSFORM_TRANSITION}s`,
  BLUR_ANIMATION: `${BLUR_ANIMATION_DURATIONS.ANIMATION_DURATION}s`,
  GENERAL_TRANSITION: `${BLUR_ANIMATION_DURATIONS.GENERAL_TRANSITION}s`,

  // Slot animations
  SLOT_SPIN_0: `${SLOT_ANIMATION_DURATIONS.DIGIT_0}s`,
  SLOT_SPIN_1: `${SLOT_ANIMATION_DURATIONS.DIGIT_1}s`,
  SLOT_SPIN_2: `${SLOT_ANIMATION_DURATIONS.DIGIT_2}s`,

  // Fades
  OVERLAY_FADE: `${FADE_DURATIONS.OVERLAY_FADE / 1000}s`,
  COUNTER_TRANSITION: `${FADE_DURATIONS.COUNTER_TRANSITION / 1000}s`,
} as const;

// Easing functions
export const EASING_FUNCTIONS = {
  CUBIC_BEZIER_SMOOTH: 'cubic-bezier(0.8, 0, 0.2, 1)', // Smooth page transitions
  EASE_OUT: 'ease-out', // Slot animations
  LINEAR: 'linear', // Transform transitions
} as const;

// Combined animation values for convenience
export const ANIMATION_PRESETS = {
  PAGE_SLIDE: `${CSS_DURATIONS.SLIDE_ANIMATION} ${EASING_FUNCTIONS.CUBIC_BEZIER_SMOOTH}`,
  BLUR_TRANSFORM: `transform ${CSS_DURATIONS.TRANSFORM_TRANSITION} ${EASING_FUNCTIONS.LINEAR}`,
  GENERAL_SMOOTH: `${CSS_DURATIONS.GENERAL_TRANSITION}`,
} as const;
