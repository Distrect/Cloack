import { IsNotEmpty } from 'class-validator';
import { Program } from 'src/database/entities/program/program.entity';
import { ProgramSession } from 'src/database/entities/programsession/programSession.entity';
import {
  SessionTask,
  TaskStatus,
} from 'src/database/entities/sessiontask/sessionTask.entity';
import { Task } from 'src/database/entities/task/task.entity';

export class createSessionBody {
  @IsNotEmpty()
  public programId: number;
}

export class updateSessionBody {
  public countdownSessionId: number;
  public programs: sessionProgram[];
}

class sessionTask {
  public sessionTaskId: number;
  public taskName: string;
  public taskDescription: string;
  public taskDuration: string;
  public order: number;
  public taskColor: string;
  public elapsedTime: string;
  public status: TaskStatus;
  public deleted: boolean;
  public created: boolean;
  public updated: boolean;
}

class sessionProgram {
  @IsNotEmpty()
  public programId: number;
  @IsNotEmpty()
  public programOrder: number;
  public programSessionId: number;
  public programCreated: boolean;
  public programDeleted: boolean;
  public tasks: sessionTask[];
}

export class DeleteSessionTaskDTO {
  @IsNotEmpty()
  public task: SessionTask;
}

export class DeleteSesssionProgram {
  @IsNotEmpty()
  public program: ProgramSession;
}

export class AddProgramToTheSession {
  @IsNotEmpty()
  public program: Program;

  @IsNotEmpty()
  public index: number;
}

export class AddTaskToTheSession {
  @IsNotEmpty()
  public task: Task;

  @IsNotEmpty()
  public index: number;
}

export class CreateTaskForProgramSession {
  @IsNotEmpty()
  public taskName: string;

  @IsNotEmpty()
  public duration: string;

  @IsNotEmpty()
  public index: number;
}

export class UpdateTask {
  @IsNotEmpty()
  public duration: string;

  @IsNotEmpty()
  public taskName: string;
}

export interface ISessionTaskOrder {
  sessionTaskId: number;
  order: number;
}

export interface IProgramOrder {
  programSessionId: number;
  programOrder: number;
}

export class UpdateCountdownSession {
  @IsNotEmpty()
  public programSessions: IProgramOrder[];

  @IsNotEmpty()
  public tasks: ISessionTaskOrder[];
}

export class UpdateProgramSession {
  @IsNotEmpty()
  public programName: string;
}

export interface IFinalResult {
  status: TaskStatus;
  elapsed: number;
  sessionTaskId: number;
  order: number;
}

export class SaveResults {
  @IsNotEmpty()
  public sessionTaskResults: IFinalResult[];
}
