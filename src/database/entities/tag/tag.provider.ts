import { DataSource } from 'typeorm';
import { Tag } from './tag.entity';

export const tagProvider = [
  {
    provide: 'TagRepository',
    useFactory: (dataSoruce: DataSource) => dataSoruce.getRepository(Tag),
    inject: ['DATA_SOURCE'],
  },
];
