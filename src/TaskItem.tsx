import { CheckIcon } from '@chakra-ui/icons';
import { ListItem, ListIcon, Text, Fade } from '@chakra-ui/react';
import React from 'react';
import { Task, tasksService } from './database/TasksService';

type ItemProps = {
  task: Task;
  color?: string;
};

export const TaskItem: React.FC<ItemProps> = ({ task, color }) => {
  return (
    <Fade in={true}>
      <ListItem
        px={2}
        py={2}
        cursor="pointer"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        onClick={() => tasksService.toggleDone(task)}
      >
        <Text textDecoration={task.done ? 'line-through' : 'none'}>{task.title}</Text>
        {task.done ? <ListIcon as={CheckIcon} color={color ?? 'cyan.500'} /> : null}
      </ListItem>
    </Fade>
  );
};
