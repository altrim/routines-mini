import schedule from 'node-schedule';
import { Routine } from './database/RoutinesService';

export class JobScheduler {
  routine: Routine;

  constructor(routine: Routine) {
    this.routine = routine;
  }

  schedule(): schedule.Job | null {
    if (!this.routine.scheduleAt) {
      return null;
    }

    return schedule.scheduleJob(this.routine.scheduleAt, () => this.notify());
  }

  private notify() {
    return new Notification(`${this.routine.emoji ?? ''} ${this.routine.title}`, {
      icon: '/assets/icon@2x.png',
      body: `It's time for your ${this.routine.title} routine!.`,
    });
  }
}
