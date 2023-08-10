import { DataSource } from 'typeorm';
import { Program } from './program.entity';

export const programProvider = [
  {
    provide: 'ProgramRepository',
    useFactory: (dataSoruce: DataSource) => dataSoruce.getRepository(Program),
    inject: ['DATA_SOURCE'],
  },
];
