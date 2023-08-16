import { DataSource } from 'typeorm';
import { Task } from './task.entity';
import { SharedTask } from './task.audit';

export const taskProvider = [
  {
    provide: 'TaskRepository',
    useFactory: (dataSoruce: DataSource) => dataSoruce.getRepository(Task),
    inject: ['DATA_SOURCE'],
  },
];
export const sharedTaskProvider = [
  {
    provide: 'SharedTaskRepository',
    useFactory: (dataSoruce: DataSource) =>
      dataSoruce.getRepository(SharedTask),
    inject: ['DATA_SOURCE'],
  },
];
