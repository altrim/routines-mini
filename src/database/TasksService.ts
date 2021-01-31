import { Table } from 'dexie';
import { db } from './RoutinesDB';

export type TasksTable = {
  id?: number;
  routineId: number;
  title: string;
  done?: boolean;
};

export type Task = {
  id?: number;
  routineId: number;
  title: string;
  done?: boolean;
};

class TasksService {
  table: Table<TasksTable>;

  constructor() {
    this.table = db.tasks;
  }

  getTasksForRoutine(routineId: number) {
    return this.table.where('routineId').equals(routineId).reverse().toArray();
  }

  resetTasksForRoutine(routineId: number) {
    return this.table.where('routineId').equals(routineId).modify({ done: false });
  }

  createTask(task: Task) {
    return this.table.add(task);
  }

  async toggleDone(task: Task) {
    if (task.id) {
      const t = await this.table.where('id').equals(task.id).first();
      return this.table.update(task?.id, { done: !t?.done });
    }

    return Promise.resolve(task);
  }

  getTaskCountForRoutine(routineId: number) {
    return this.table.where('routineId').equals(routineId).count();
  }

  getCompletedTaskCountForRoutine(routineId: number) {
    return this.table
      .where('routineId')
      .equals(routineId)
      .filter((t) => t.done!)
      .count();
  }

  async allTasksCompletedForRoutine(routineId: number) {
    const tasks = await this.getTaskCountForRoutine(routineId);
    const completed = await this.getCompletedTaskCountForRoutine(routineId);

    return tasks > 0 && tasks === completed;
  }
}

export const tasksService = new TasksService();
