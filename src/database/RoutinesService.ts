import { Table } from 'dexie';
import { db } from './RoutinesDB';

export type RoutinesTable = {
  id?: number;
  title: string;
  icon?: string;
  color?: string;
  emoji?: string;
};

export type Routine = {
  id?: number;
  title: string;
  color?: string;
  emoji?: string;
};

class RoutinesService {
  table: Table<RoutinesTable>;

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
