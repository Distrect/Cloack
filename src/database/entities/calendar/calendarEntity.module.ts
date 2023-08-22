import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { calendarProvider } from './calendar.provider';
import { CalendarEntityService } from './calendareEntity.service';
import { programCalendarProvider } from '../ProgramCalendar/programCalendarEntity.provider';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...calendarProvider,
    ...programCalendarProvider,
    CalendarEntityService,
  ],
  exports: [CalendarEntityService],
})
export class CalendarEntityModule {}
