import { IsNotEmpty } from 'class-validator';
import { TaskStatus } from 'src/database/entities/sessiontask/sessionTask.entity';

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
