import { Injectable, Inject } from '@nestjs/common';
import { CookieUser } from 'src/middleware/cookieMiddleware/cookie.middleware';
import { TaskEntityService } from 'src/database/entities/task/task.service';
import { CountdownSessionEntityService } from 'src/database/entities/countdownsession/countdownSessionEntity.service';
import {
  AddProgramToTheSession,
  AddTaskToTheSession,
  CreateTaskForProgramSession,
  DeleteSessionTaskDTO,
  DeleteSesssionProgram,
  SaveResults,
  UpdateCountdownSession,
  UpdateTask,
  createSessionBody,
  updateSessionBody,
} from './dto/countdownSession.dto';
import { ProgramTaskEntityService } from 'src/database/entities/programtask/programTaskEntityService.service';
import { calculateTotalDuration } from 'src/util';

@Injectable()
export class CountdownSessionService {
  constructor(
    @Inject(CountdownSessionEntityService)
    private sessionRep: CountdownSessionEntityService,
    @Inject(TaskEntityService)
    private taskRep: TaskEntityService,
    @Inject(ProgramTaskEntityService)
    private programTaskRep: ProgramTaskEntityService,
  ) {}

  public async addProgramToTheSession(
    countdownSessionId: number,
    { program, index }: AddProgramToTheSession,
  ) {
    const programSession = await this.sessionRep.createProgramSessionInstance(
      program.programId,
      countdownSessionId,
      index,
    );

    const programTasks = await this.programTaskRep.getProgramTaskOfProgram(
      program.programId,
    );

    const createdSesisonTasks = await this.sessionRep.createSessionTasks(
      programTasks,
      programSession.programSessionId,
    );

    const newProgramSession =
      await this.sessionRep.getProgramSessionWithSessionTasks(
        programSession.programSessionId,
      );

    newProgramSession.program.totalsDuration = calculateTotalDuration(
      newProgramSession.tasks,
    );

    console.log('dsadsaDSADSADSADSA', newProgramSession);
    return newProgramSession;
  }

  public async deleteSessionTask(body: DeleteSessionTaskDTO) {
    const deleted = await this.sessionRep.deleteTask(body.task.sessionTaskId);
    console.log(deleted);
    return true;
  }

  public async createSession(user: CookieUser, body: createSessionBody) {
    const { userId } = user;
    const { programId } = body;

    console.log(userId, programId);

    //get countdown session

    // const countdownSession = await this.sessionRep.getCountdownSession(userId);
    const countdownSession = await this.sessionRep.createSessionInstance(
      userId,
    );

    const programSession = await this.sessionRep.createProgramSessionInstance(
      programId,
      countdownSession.countdownSessionId,
    );

    const programTasks = await this.programTaskRep.getProgramTaskOfProgram(
      programId,
    );

    const createdSessionTasks = await this.sessionRep.createSessionTasks(
      programTasks,
      programSession.programSessionId,
    );

    return countdownSession.countdownSessionId;
  }

  //task ve program orderlarına çok dikkat et

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
      this.programTaskRep.getProgramTaskOfProgram(programId),
      // this.taskRep.getTasksOfProgram(programId),
    ]);

    const programSessionWithTasks = this.sessionRep.createSessionTasks(
      tasksOfProgram,
      newSessionprogram.programSessionId,
    );

    return programSessionWithTasks;
  }

  public async getCountdownSessionWithProgramsAndTasks(
    countdownSessionId: number,
  ) {
    const session = await this.sessionRep.getSessionProgramsWithTasks(
      countdownSessionId,
    );

    session.programSessions.map((ps) => {
      const programDuration = calculateTotalDuration(ps.tasks);
      ps.program.totalsDuration = programDuration;
    });

    return session;
  }

  public async deleteSessionProgram(requestBody: DeleteSesssionProgram) {
    const { program } = requestBody;
    const {
      programSessionId,
      program: { programId },
    } = program;

    const deleted = await this.sessionRep.deleteProgram(
      programSessionId,
      programId,
    );
    return deleted;
  }

  public async AddTaskToTheSession(
    { task, index }: AddTaskToTheSession,
    programSessionId: number,
  ) {
    const createdSessionTask = await this.sessionRep.addTaskToTheProgramSession(
      task,
      programSessionId,
      index,
    );
    return createdSessionTask;
  }

  public async createTaskForProgramSession(
    body: CreateTaskForProgramSession,
    programSessionId: number,
  ) {
    const createdTask = await this.sessionRep.createSessionTask(
      body,
      programSessionId,
    );
    return createdTask;
  }

  public async updateTask(body: UpdateTask, sessionTaskId: number) {
    const updated = await this.sessionRep.updateSessionTask(
      body,
      sessionTaskId,
    );

    return updated;
  }

  public async orderProgramSessionsWithTasks(
    countdownSessionId: number,
    body: UpdateCountdownSession,
  ) {
    const [programSessionResult, sessionTaskResult] = await Promise.all([
      this.sessionRep.orderProgramSessions(body.programSessions),
      this.sessionRep.orderSessionTasks(body.tasks),
    ]);

    return [programSessionResult, sessionTaskResult];
  }

  public async saveResults(body: SaveResults, countdownSessionId: number) {
    const savedResults = await this.sessionRep.saveEndResults(
      body.sessionTaskResults,
    );

    const { totalDuration, totalElapsed } =
      await this.sessionRep.getCountdownSessionScore(countdownSessionId);

    const score = (parseInt(totalElapsed) * 100) / parseInt(totalDuration);

    console.log('score data', score);
  }
}

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

/*
  private async createTaskForSpecificProgramSession(
    programSessionId: number,
    programId: number,
    fields: Partial<SessionTask>,
  ) {}*/

//// Noramlde tasklar çekilmeli fakat reusable tasklar işi bozuyor o yüzden program task tarafından çek
//  const tasksOfProgram = await this.taskRep.getTasksOfProgram(programId);
/*
    const createdSessionTasks = await this.sessionRep.createSessionTasks(
      tasksOfProgram,
      programSession.programSessionId,
    );

    console.log(createdSessionTasks);
*/
/*
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
    );*/

/*

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
          ); //{programId,countdownSessionId,programOrder,}
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

    */

/*////
    const convertedSessionTasks =
      this.sessionRep.convertProgramTasksToSessionTasks(
        programTasks,
        programSession.programSessionId,
      );

    programSession.tasks = [...convertedSessionTasks];

    const saved = await this.sessionRep.saveProgramSession(programSession);

    const newProgramSession =
      await this.sessionRep.getProgramSessionWithSessionTasks(
        programSession.programSessionId,
      );

    console.log('nerw', newProgramSession);

    return newProgramSession;*/

/*const createdSessionTasks = await this.sessionRep.createSessionTasks(
      programTasks,
      programSession.programSessionId,////
    );*/
