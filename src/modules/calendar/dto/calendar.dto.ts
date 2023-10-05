import { IsNotEmpty } from 'class-validator';

export class createPorgramCalendarDto {
  @IsNotEmpty()
  public programId: number;

  @IsNotEmpty()
  public startDate: Date;

  public calendarId?: number;
}

export class editProgramCalendarDto {
  @IsNotEmpty()
  public startDate: Date;
}
