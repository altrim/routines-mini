import Dexie, { Table } from 'dexie';
import { RoutinesTable } from './RoutinesService';
import { TasksTable } from './TasksService';

class RoutinesDB extends Dexie {
  routines!: Table<RoutinesTable>;
  tasks!: Table<TasksTable>;

  constructor() {
    super('routinesDB');
    this.version(2).stores({
      routines: `
        ++id,
        title,
        color,
        emoji`,
      tasks: `
      ++id,
        title,
        routineId,
        done`,
    });
  }
}

export const db = new RoutinesDB();
