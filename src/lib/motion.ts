export const TRANSITION_EASE = [0.22, 1, 0.36, 1] as const;

export const STANDARD_DURATION = 0.6;

export const STANDARD_TRANSITION = {
  duration: STANDARD_DURATION,
  ease: TRANSITION_EASE,
};

export const hoverLift = {
  y: -4,
  transition: STANDARD_TRANSITION,
};
