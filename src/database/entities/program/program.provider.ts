import { DataSource } from 'typeorm';
import { Program } from './program.entity';
import { SharedProgram } from './program.audit';

export const programProvider = [
  {
    provide: 'ProgramRepository',
    useFactory: (dataSoruce: DataSource) => dataSoruce.getRepository(Program),
    inject: ['DATA_SOURCE'],
  },
];
export const sharedProgramProvider = [
  {
    provide: 'SharedProgramRepository',
    useFactory: (dataSoruce: DataSource) =>
      dataSoruce.getRepository(SharedProgram),
    inject: ['DATA_SOURCE'],
  },
];
