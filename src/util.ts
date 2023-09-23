import * as moment from 'moment';
import { Task } from './database/entities/task/task.entity';
import { SessionTask } from './database/entities/sessiontask/sessionTask.entity';

export const extractCookie = (cookieName: string, cookies: string) => {
  if (!cookies) return;
  const splitted = cookies.split(';');
  const cookie = splitted.find((cookie) => cookie.includes(cookieName));

  return cookie.split('=')[1];
};

export const calculateTotalDuration = (tasks: Task[] | SessionTask[]) => {
  const duration = moment.duration();

  for (const task of tasks) {
    duration.add(task.taskDuration);
  }

  return duration.as('milliseconds');
};
