import { IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  public taskName: string;

  @IsNotEmpty()
  public taskDuration: string;

  public taskColor: string;

  public taskDescription: string;

  public isReusable: boolean;
}
