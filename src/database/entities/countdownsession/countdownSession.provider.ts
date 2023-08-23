import { DataSource } from 'typeorm';
import { CountdownSession } from './countdownSession.entity';

export const countdownSessionProvider = [
  {
    provide: 'CountdownSessionRepository',
    useFactory: (dataSoruce: DataSource) =>
      dataSoruce.getRepository(CountdownSession),
    inject: ['DATA_SOURCE'],
  },
];
