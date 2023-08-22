import { DataSource } from 'typeorm';
import { CountdownSession } from './countdownSession.entity';

export const countdownSessionProvider = [
  {
    provide: 'CountdownSessionRepository',
    useFactory: (dataSoruce: DataSource) => {
      const rep = dataSoruce.getRepository(CountdownSession);
      console.log(rep);
      return rep;
    },
    inject: ['DATA_SOURCE'],
  },
];
