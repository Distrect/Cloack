import { IsNotEmpty } from 'class-validator';

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
