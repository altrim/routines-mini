import { Avatar, Box, Heading, ListItem } from '@chakra-ui/react';
import { useLiveQuery } from 'dexie-react-hooks';
import React from 'react';
import { Link } from 'react-router-dom';
import { Routine } from './database/RoutinesService';
import { tasksService } from './database/TasksService';
import styles from './Routines.module.css';

const Emoji: React.FC<{ emoji: string }> = ({ emoji }) => {
  return (
    <Box
      mr={4}
      width="3rem"
      height="3rem"
      fontSize="40px"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      {emoji}
    </Box>
  );
};

type ItemProps = {
  routine: Routine;
};

export const RoutineItem: React.FC<ItemProps> = ({ routine }) => {
  const tasksCount = useLiveQuery(() => tasksService.getTaskCountForRoutine(routine.id!), [
    routine.id,
  ]);
  const completed = useLiveQuery(() => tasksService.getCompletedTaskCountForRoutine(routine.id!), [
    routine.id,
  ]);

  return (
    <ListItem pl={4}>
      <Link to={`/routine/${routine.id}`} className={styles.flex}>
        {routine.emoji ? (
          <Emoji emoji={routine.emoji} />
        ) : (
          <Avatar name={routine.title} mr={4} background={routine.color} />
        )}
        <Box>
          <Heading as="h1" fontSize="lg" fontWeight="normal">
            {routine.title}
          </Heading>
          <small>{`${tasksCount} tasks/ ${completed} completed`}</small>
        </Box>
      </Link>
    </ListItem>
  );
};
