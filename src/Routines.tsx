import React from 'react';
import { AddIcon } from '@chakra-ui/icons';
import { Button, Heading, List, useDisclosure } from '@chakra-ui/react';
import { useLiveQuery } from 'dexie-react-hooks';
import { routinesService } from './database/RoutinesService';
import { RoutineCreator } from './RoutineCreator';
import { RoutineItem } from './RoutineItem';
import { Toolbar } from './Toolbar';
import { useOverflowY } from './useOverflowY';
import styles from './Routines.module.css';

export const Routines: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const routines = useLiveQuery(() => routinesService.getAll(), []);
  const [overflowY] = useOverflowY();

  return (
    <div className={styles.Routines} style={{ overflowY }}>
      <Toolbar zIndex={2}>
        <Heading fontSize="xl" as="h1">
          Routines
        </Heading>
        <Button colorScheme="white" variant="ghost" onClick={onOpen}>
          <AddIcon />
        </Button>
      </Toolbar>
      <RoutineCreator isOpen={isOpen} onClose={onClose} />
      <List pl={0}>
        {routines?.map((routine) => (
          <RoutineItem key={routine.id} routine={routine} />
        ))}
      </List>
    </div>
  );
};
