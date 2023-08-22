import { CalendarService } from './calendar.service';
import {
  Controller,
  Inject,
  Body,
  Post,
  ParseIntPipe,
  Param,
  Delete,
} from '@nestjs/common';
import {
  createPorgramCalendarDto,
  editProgramCalendarDto,
} from './dto/calendar.dto';

@Controller('calendar')
export class CalendarController {
  @Inject(CalendarService) private calendarService: CalendarService;

  @Post('/createProgramCalendar')
  public async CreateProgramCalendar(
    @Body() requestBody: createPorgramCalendarDto,
  ) {
    const createdProgramCalendar =
      await this.calendarService.createProgramCalendar(requestBody);
    return {
      ok: true,
      message: 'Program succesfully saved to the calendar',
      programCalendar: createdProgramCalendar,
    };
  }

  @Post('/editProgramCalendar/:programCalendarId')
  public async EditProgramCalendar(
    @Body() requestBody: editProgramCalendarDto,
    @Param(':programCalendarId', ParseIntPipe) programCalendarId: number,
  ) {
    const updatedProgramCalendar =
      await this.calendarService.updateProgramCalendar(
        requestBody,
        programCalendarId,
      );

    return {
      ok: true,
      message: 'Calendar successfully updated',
      programCalendar: updatedProgramCalendar,
    };
  }

  @Delete('/deleteProgramCalendar/:programCalendarId')
  public async DeleteprogramCalendar(
    @Param('programCalendarId', ParseIntPipe) programCalendarId: number,
  ) {}
}
