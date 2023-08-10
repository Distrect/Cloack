import { DataSource } from 'typeorm';
import { User } from './user.entity';

export const userProvider = [
  {
    provide: 'UserRepository',
    useFactory: (dataSoruce: DataSource) => dataSoruce.getRepository(User),
    inject: ['DATA_SOURCE'],
  },
];
