import { Table } from 'dexie';
import { db } from './RoutinesDB';

export type Routine = {
  id?: number;
  title: string;
  icon?: string;
  color?: string;
  emoji?: string;
  scheduleAt?: string;
};

class RoutinesService {
  table: Table<Routine>;

  constructor() {
    this.table = db.routines;
  }

  getById(routineId: number) {
    return this.table.where('id').equals(routineId).first();
  }

  getAll() {
    return this.table.toCollection().reverse().toArray();
  }

  createRoutine(routine: Routine) {
    return this.table.add(routine);
  }
}

export const routinesService = new RoutinesService();
