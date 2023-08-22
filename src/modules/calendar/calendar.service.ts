import { Injectable, Inject, Post, Body } from '@nestjs/common';
import { CalendarEntityService } from 'src/database/entities/calendar/calendareEntity.service';
import {
  createPorgramCalendarDto,
  editProgramCalendarDto,
} from './dto/calendar.dto';

@Injectable()
export class CalendarService {
  @Inject(CalendarEntityService)
  private calendarEntityService: CalendarEntityService;

  public async createProgramCalendar(param: createPorgramCalendarDto) {
    const newProgramCalendar =
      await this.calendarEntityService.createProgramCalendar(param);
    return newProgramCalendar;
  }

  public async updateProgramCalendar(
    param: editProgramCalendarDto,
    programCalendarId: number,
  ) {
    return await this.calendarEntityService.updateProgramCalendar(
      programCalendarId,
      param,
    );
  }

  public async deleteProgramCalendar(programCalendarId: number) {
    const deleted = await this.calendarEntityService.deleteProgramCalendar(
      programCalendarId,
    );

    return { ok: true, message: 'Program successfully deleted on calendar' };
  }
}
