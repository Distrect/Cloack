import { Repository } from 'typeorm';
import { Injectable, Inject } from '@nestjs/common';
import { Calendar } from './calendar.entity';
import { ProgramCalendar } from '../ProgramCalendar/programCalendarEntity.entity';
import {
  createPorgramCalendarDto,
  editProgramCalendarDto,
} from 'src/modules/calendar/dto/calendar.dto';

@Injectable()
export class CalendarEntityService {
  constructor(
    @Inject('CalendarRepository')
    private calendarRepository: Repository<Calendar>,
    @Inject('ProgramCalendarRepository')
    private programCalendarRepository: Repository<ProgramCalendar>,
  ) {}

  public async createProgramCalendar({
    programId,
    startDate,
    calendarId,
  }: createPorgramCalendarDto) {
    const created = this.programCalendarRepository.create({
      calendar: { calendarId },
      program: { programId },
      startDate,
    });
    return await this.saveProgramCalendar(created);
  }

  public async updateProgramCalendar(
    programCalendarId: number,
    param: editProgramCalendarDto,
  ) {
    const updated = this.programCalendarRepository.save({
      programCalendarId: programCalendarId,
      startDate: param.startDate,
    });
    return updated;
    /*const updated = await this.programCalendarRepository
      .createQueryBuilder('program_calendar')
      .update()
      .set(param)
      .where('program_calendar.programCalendarId = :programCalendarId', {
        programCalendarId,
      })
      .execute();*/
  }

  public async deleteProgramCalendar(programCalendarId: number) {
    const deleted = await this.programCalendarRepository.delete({
      programCalendarId,
    });
    return deleted;
  }

  private async saveProgramCalendar(programClendar: ProgramCalendar) {
    return this.programCalendarRepository.save(programClendar);
  }
}
