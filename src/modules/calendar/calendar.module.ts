import { Module } from '@nestjs/common';
import { CalendarEntityModule } from 'src/database/entities/calendar/calendarEntity.module';
import { CalendarService } from './calendar.service';
import { CalendarController } from './calendar.controller';

@Module({
  imports: [CalendarEntityModule],
  providers: [CalendarService],
  controllers: [CalendarController],
})
export class CalendarModule {}
