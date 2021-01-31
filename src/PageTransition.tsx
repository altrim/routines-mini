import { motion } from 'framer-motion';
import React from 'react';
import { variants } from './variants';

export const PageTransition: React.FC<{ direction: number }> = ({ children, direction = 0 }) => {
  return (
    <motion.div
      style={{ width: '100vw', height: '100vh' }}
      initial="enter"
      animate="center"
      exit="exit"
      custom={direction}
      variants={variants}
      transition={{
        x: { type: 'spring', stiffness: 300, damping: 30 },
      }}
    >
      {children}
    </motion.div>
  );
};
