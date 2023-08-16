import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { calendarProvider } from './calendar.provider';
import { CalendarEntityService } from './calendareEntity.service';

@Module({
  imports: [DatabaseModule],
  providers: [...calendarProvider, CalendarEntityService],
  exports: [CalendarEntityService],
})
export class CalendarEntityModule {}
