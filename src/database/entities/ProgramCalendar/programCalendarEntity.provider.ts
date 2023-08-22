import { DataSource } from 'typeorm';
import { ProgramCalendar } from './programCalendarEntity.entity';

export const programCalendarProvider = [
  {
    provide: 'ProgramCalendarRepository',
    useFactory: (dataSoruce: DataSource) =>
      dataSoruce.getRepository(ProgramCalendar),
    inject: ['DATA_SOURCE'],
  },
];
