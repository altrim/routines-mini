import Dexie, { Table } from 'dexie';
import { Routine } from './RoutinesService';
import { Task } from './TasksService';

class RoutinesDB extends Dexie {
  routines!: Table<Routine>;
  tasks!: Table<Task>;

  constructor() {
    super('routinesDB');
    this.version(3).stores({
      routines: `
        ++id,
        title,
        color,
        emoji,
        scheduleAt`,
      tasks: `
      ++id,
        title,
        routineId,
        done`,
    });
  }
}

export const db = new RoutinesDB();
