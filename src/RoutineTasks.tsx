import React from 'react';
import { ArrowBackIcon, RepeatClockIcon } from '@chakra-ui/icons';
import { Button, Flex, Heading, Input, List, useToast } from '@chakra-ui/react';
import { useLiveQuery } from 'dexie-react-hooks';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import { routinesService } from './database/RoutinesService';
import { Task, tasksService } from './database/TasksService';
import styles from './RoutineTasks.module.css';
import { TaskItem } from './TaskItem';
import { Toolbar } from './Toolbar';
import { useOverflowY } from './useOverflowY';

export const RoutineTasks: React.FC = () => {
  const history = useHistory();
  const toast = useToast();
  const { register, handleSubmit, reset } = useForm();
  const { id } = useParams<{ id: string }>();
  const routineId = parseInt(id);
  const [overflowY] = useOverflowY();

  const routine = useLiveQuery(() => routinesService.getById(routineId), []);
  const allCompleted = useLiveQuery(() => tasksService.allTasksCompletedForRoutine(routineId), [
    routineId,
  ]);
  const tasks = useLiveQuery(() => tasksService.getTasksForRoutine(routineId), [routineId]);

  React.useEffect(() => {
    if (!allCompleted) {
      return;
    }
    toast({
      position: 'bottom',
      title: 'Hooray!',
      description: 'All tasks completed 🔥',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  }, [toast, allCompleted]);

  const onSubmit = async (task: Task) => {
    await tasksService.createTask({ ...task, routineId });
    reset({ title: '' });
  };

  return (
    <div className={styles.Tasks} style={{ overflowY }}>
      <Toolbar backgroundColor={routine?.color} zIndex={2}>
        <Button variant="ghost" colorScheme="white" onClick={() => history.push('/')}>
          <ArrowBackIcon w={6} h={6} />
        </Button>
        <Heading as="h1" fontSize="2xl">
          {routine?.title}
        </Heading>
        <Button
          variant="ghost"
          colorScheme="white"
          onClick={async () => {
            await tasksService.resetTasksForRoutine(routineId);
            toast({
              position: 'bottom',
              description: 'Tasks have been reset 👍',
              status: 'success',
              duration: 4200,
              isClosable: true,
            });
          }}
        >
          <RepeatClockIcon w={6} h={6} />
        </Button>
      </Toolbar>
      <Flex p={4} direction="column">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            focusBorderColor={routine?.color}
            type="text"
            name="title"
            ref={register}
            autoFocus
            placeholder="Add task..."
          />
        </form>
        <List my={4}>
          {tasks?.map((task) => (
            <TaskItem key={task.id} task={task} color={routine?.color} />
          ))}
        </List>
      </Flex>
    </div>
  );
};
