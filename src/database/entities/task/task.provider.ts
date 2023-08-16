import { DataSource } from 'typeorm';
import { Task } from './task.entity';

export const taskProvider = [
  {
    provide: 'TaskRepository',
    useFactory: (dataSoruce: DataSource) => dataSoruce.getRepository(Task),
    inject: ['DATA_SOURCE'],
  },
];
