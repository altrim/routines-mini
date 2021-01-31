import { Box } from '@chakra-ui/react';
import React from 'react';
import styles from './Toolbar.module.css';

export const Toolbar: React.FC<{
  backgroundColor?: string;
  zIndex?: number;
}> = ({ children, backgroundColor = '#22506d', zIndex = 1 }) => {
  return (
    <Box className={styles.Toolbar} style={{ backgroundColor }} zIndex={zIndex}>
      {children}
    </Box>
  );
};
