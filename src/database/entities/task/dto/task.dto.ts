import { IsNotEmpty } from 'class-validator';

export class createTaskDto {
  @IsNotEmpty()
  public taskName: string;

  @IsNotEmpty()
  public taskDuration: string;

  public taskDescription: string;

  public taskColor: string;

  public isReusable: boolean;
}

export class updateTaskDto {
  public taskName: string;

  public taskDuration: string;

  public taskDescription: string;

  public taskColor: string;

  public isReusable?: boolean;
}
