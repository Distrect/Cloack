import { DataSource } from 'typeorm';
import { Friendship } from './friendship.entity';

export const friendShipProvider = [
  {
    provide: 'FriendShipRepository',
    useFactory: (dataSoruce: DataSource) =>
      dataSoruce.getRepository(Friendship),
    inject: ['DATA_SOURCE'],
  },
];
