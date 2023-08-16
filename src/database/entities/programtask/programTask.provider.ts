import { DataSource } from 'typeorm';
import { ProgramTask } from './programTask.entity';
import { SharedProgramTask } from './programTask.audit';

export const programTaskProvider = [
  {
    provide: 'ProgramTaskRepository',
    useFactory: (dataSoruce: DataSource) =>
      dataSoruce.getRepository(ProgramTask),
    inject: ['DATA_SOURCE'],
  },
];
export const sharedProgramTaskProvider = [
  {
    provide: 'SharedProgramTaskRepository',
    useFactory: (dataSoruce: DataSource) =>
      dataSoruce.getRepository(SharedProgramTask),
    inject: ['DATA_SOURCE'],
  },
];
