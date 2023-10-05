import { IsNotEmpty } from 'class-validator';
import { SortBy } from 'src/database/entities/program/programEntity.service';

export class createProgramDto {
  @IsNotEmpty()
  public programName: string;

  public programDescription: string;

  public tagId: number;
}

export class createProgram extends createProgramDto {
  @IsNotEmpty()
  public userUserId: number;
}

export class editProgramDto extends createProgramDto {
  public programName: string;

  public programDescription: string;

  public tagTagId: number;
}

export interface EditCriteria {
  programId?: number;
  programName?: string;
}

export interface UpdateProgram {
  programName?: string;
  programDescription?: string;
  tagTagId?: string;
}

export class Task {
  public taskId: number;

  @IsNotEmpty()
  public taskName: string;

  @IsNotEmpty()
  public taskDuration: string;

  public taskDescription: string;

  public taskColor: string;

  public edited: boolean;
}

export class UpdateProgramDto {
  @IsNotEmpty()
  public newOrder: number;

  @IsNotEmpty()
  public order: number;

  @IsNotEmpty()
  public isReusable: boolean;

  public created: boolean;

  public deleted: boolean;

  public edited: boolean;

  public programTaskId: number;

  @IsNotEmpty()
  public task: Task;
}

export class getProgramDto {
  public searchString: string;
  public order: SortBy;
  public pageNumber: number;
}
