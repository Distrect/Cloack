import { DataSource } from 'typeorm';
import { OrderTask } from './orderTask.entity';

export const OrderTaskProvider = [
  {
    provide: 'OrderTaskRepository',
    useFactory: (dataSoruce: DataSource) => dataSoruce.getRepository(OrderTask),
    inject: ['DATA_SOURCE'],
  },
];
