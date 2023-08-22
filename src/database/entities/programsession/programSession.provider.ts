import { DataSource } from 'typeorm';
import { ProgramSession } from './programSession.entity';

export const programSessionProvider = [
  {
    provide: 'ProgramSessionRepository',
    useFactory: (dataSoruce: DataSource) =>
      dataSoruce.getRepository(ProgramSession),
    inject: ['DATA_SOURCE'],
  },
];
