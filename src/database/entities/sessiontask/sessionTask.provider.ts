import { DataSource } from 'typeorm';
import { SessionTask } from './sessionTask.entity';

export const sessionTaskProvider = [
  {
    provide: 'SessionTaskRepository',
    useFactory: (dataSoruce: DataSource) =>
      dataSoruce.getRepository(SessionTask),
    inject: ['DATA_SOURCE'],
  },
];
