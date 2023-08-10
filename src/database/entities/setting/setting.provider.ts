import { DataSource } from 'typeorm';
import { Setting } from './setting.entity';

export const settingProvider = [
  {
    provide: 'SettingRepository',
    useFactory: (dataSoruce: DataSource) => dataSoruce.getRepository(Setting),
    inject: ['DATA_SOURCE'],
  },
];
