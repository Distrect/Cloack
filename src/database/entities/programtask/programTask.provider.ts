import { DataSource } from 'typeorm';
import { ProgramTask } from './programTask.entity';

export const programTaskProvider = [
  {
    provide: 'ProgramTaskRepository',
    useFactory: (dataSoruce: DataSource) =>
      dataSoruce.getRepository(ProgramTask),
    inject: ['DATA_SOURCE'],
  },
];
