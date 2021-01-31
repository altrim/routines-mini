const transition = {
  duration: 0.2,
  ease: [0.42, 0.12, 0.22, 0.96],
};
export const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? '50%' : '-50%',
      opacity: 0,
      transition,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? '50%' : '-50%',
      opacity: 0,
      transition,
    };
  },
};
