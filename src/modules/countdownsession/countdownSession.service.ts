import { Injectable, Inject } from '@nestjs/common';
import { CookieUser } from 'src/middleware/cookieMiddleware/cookie.middleware';
import { TaskEntityService } from 'src/database/entities/task/task.service';
import { CountdownSessionEntityService } from 'src/database/entities/countdownsession/countdownSessionEntity.service';
import {
  createSessionBody,
  updateSessionBody,
} from './dto/countdownSession.dto';

@Injectable()
export class CountdownSessionService {
  constructor(
    @Inject(CountdownSessionEntityService)
    private sessionRep: CountdownSessionEntityService,
    @Inject(TaskEntityService)
    private taskRep: TaskEntityService,
  ) {}

  public async createSession(user: CookieUser, body: createSessionBody) {
    const { userId } = user;
    const { programId } = body;

    const [newSession, newProgramSession, tasksOfProgram] = await Promise.all([
      this.sessionRep.createSessionInstance(userId),
      this.sessionRep.createProgramSessionInstance(programId),
      this.taskRep.getTasksOfProgram(programId),
    ]);

    const sessionTasks = await this.sessionRep.createSessionTasks(
      tasksOfProgram,
      newProgramSession.programSessionId,
    );

    newSession.programSessions = [newProgramSession];
    const savedNewSession = await this.sessionRep.saveCountdownSession(
      newSession,
    );

    return await this.sessionRep.getSessionProgramsWithTasks(
      savedNewSession.countdownSessionId,
    );
  }

  //task ve program orderlarına çok dikkat et

  public async updateSession(body: updateSessionBody) {
    const { countdownSessionId, programs } = body;

    const programsToBeDeleted = [];
    const programsToBeCreated = []; // programla beraber o programın tasklarıda create edilecek
    const tasksToBeDeleted = [];
    const tasksToBeUpdated = [];
    const tasksToBeCreated = [];

    programs.forEach((program) => {
      const {
        programId,
        tasks,
        programSessionId,
        programCreated,
        programDeleted,
        programOrder,
      } = program;

      if (programSessionId) {
        if (programDeleted) {
          programsToBeDeleted.push(
            this.sessionRep.deleteProgram(programSessionId, programId), //{ programSessionId, programId }
          );
          return;
        }
      } else {
        if (programCreated) {
          programsToBeCreated.push(
            this.createProgramForSession(
              countdownSessionId,
              programId,
              programOrder,
            ),
          ); /*{programId,countdownSessionId,programOrder,}*/
          return;
        }
      }

      tasks.forEach((task) => {
        const { sessionTaskId, created, deleted, updated, ...rest } = task;

        if (sessionTaskId) {
          if (deleted) {
            tasksToBeDeleted.push(this.sessionRep.deleteTask(sessionTaskId));
            return;
          }

          if (updated) {
            tasksToBeUpdated.push(
              this.sessionRep.updateSessionTask(sessionTaskId, rest),
            ); //{sessionTaskId,programSessionId,countdownSessionId,}
            return;
          }
        } else {
          if (created) {
            tasksToBeCreated.push(
              this.sessionRep.createSessionTaskForProgramSession(
                programSessionId,
                rest,
              ), //{countdownSessionId,programSessionId,programId,rest,}
            );
            return;
          }
        }
      });
    });

    const result = await Promise.all([
      ...programsToBeCreated,
      ...programsToBeDeleted,
      ...tasksToBeCreated,
      ...tasksToBeDeleted,
      ...tasksToBeUpdated,
    ]);

    console.log(result);
    return await this.sessionRep.getSessionProgramsWithTasks(
      countdownSessionId,
    );
  }

  private async createProgramForSession(
    countdownSessionId: number,
    programId: number,
    programOrder: number,
  ) {
    const [newSessionprogram, tasksOfProgram] = await Promise.all([
      this.sessionRep.createProgramForSession(
        countdownSessionId,
        programId,
        programOrder,
      ),
      this.taskRep.getTasksOfProgram(programId),
    ]);

    const programSessionWithTasks = this.sessionRep.createSessionTasks(
      tasksOfProgram,
      newSessionprogram.programSessionId,
    );

    return programSessionWithTasks;
  }
  /*
  private async createTaskForSpecificProgramSession(
    programSessionId: number,
    programId: number,
    fields: Partial<SessionTask>,
  ) {}*/
}
//

/*const newSession = await this.sessionRep.createSessionInstance(userId);
    const newProgramSession =
      await this.sessionRep.createProgramSessionInstance(programId);
    const tasksOfprogram = await this.taskRep.getTasksOfProgram(programId);*/

/*const newSessionProgram = await this.sessionRep.createProgramForSession(
      countdownSessionId,
      programId,
      programOrder,
    );
    const tasksOfProgram = await this.taskRep.getTasksOfProgram(programId);*/
