import { DataSource } from 'typeorm';
import { Notification } from './notification.entity';

export const notificationProvider = [
  {
    provide: 'NotificationRepository',
    useFactory: (dataSoruce: DataSource) =>
      dataSoruce.getRepository(Notification),
    inject: ['DATA_SOURCE'],
  },
];
