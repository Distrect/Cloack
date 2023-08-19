import { DataSource } from 'typeorm';
import { Message } from './message.entity';

export const messageProvider = [
  {
    provide: 'messageRepository',
    useFactory: (dataSoruce: DataSource) => dataSoruce.getRepository(Message),
    inject: ['DATA_SOURCE'],
  },
];
