import { DataSource } from 'typeorm';
import { Calendar } from './calendar.entity';

export const calendarProvider = [
  {
    provide: 'CalendarRepository',
    useFactory: (dataSoruce: DataSource) => dataSoruce.getRepository(Calendar),
    inject: ['DATA_SOURCE'],
  },
];
