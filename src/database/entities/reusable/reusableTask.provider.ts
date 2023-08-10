import { DataSource } from 'typeorm';
import { ReusableTask } from './reusableTask.entity';

export const reusableTaskProvider = [
  {
    provide: 'ReusableTaskRepository',
    useFactory: (dataSoruce: DataSource) =>
      dataSoruce.getRepository(ReusableTask),
    inject: ['DATA_SOURCE'],
  },
];
