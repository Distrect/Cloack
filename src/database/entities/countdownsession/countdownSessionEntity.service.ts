import { ProgramSession } from '../programsession/programSession.entity';
import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CountdownSession } from './countdownSession.entity';
import { SessionTask, TaskStatus } from '../sessiontask/sessionTask.entity';
import { Task } from '../task/task.entity';
import { ProgramTask } from '../programtask/programTask.entity';
import {
  CreateTaskForProgramSession,
  IFinalResult,
  IProgramOrder,
  ISessionTaskOrder,
  SaveResults,
  UpdateTask,
} from 'src/modules/countdownsession/dto/countdownSession.dto';

interface IScore {
  totalDuration: string;
  totalElapsed: string;
}

@Injectable()
export class CountdownSessionEntityService {
  constructor(
    @Inject('CountdownSessionRepository')
    private countdonwnSessionRep: Repository<CountdownSession>,
    @Inject('ProgramSessionRepository')
    private programSessionRep: Repository<ProgramSession>,
    @Inject('SessionTaskRepository')
    private sessionTaskRep: Repository<SessionTask>,
  ) {}

  public async getCountdownSessionScore(
    countdownSessionId: number,
  ): Promise<IScore> {
    const result = await this.sessionTaskRep
      .createQueryBuilder('session_task')
      .leftJoin(
        'session_task.programSession',
        'program_session',
        'program_session.programSessionId = session_task.sessionTaskId',
      )
      .leftJoin(
        'program_session.session',
        'countdown_session',
        'countdown_session.countdownSessionId = :countdownSessionId',
        { countdownSessionId },
      )
      .select([
        'TIME_TO_SEC(SUM(session_task.taskDuration)) as totalDuration',
        'SUM(session_task.elapsed) as totalElapsed',
      ])
      .getRawOne();
    return result;
  }

  public async orderSessionTasks(sessionTasks: ISessionTaskOrder[]) {
    const updated = await this.sessionTaskRep.save(sessionTasks);
    return updated;
  }

  public async orderProgramSessions(programSessions: IProgramOrder[]) {
    console.log(programSessions);
    return await this.programSessionRep.save(programSessions);
  }

  public async createSessionTask(
    { taskName, duration, index }: CreateTaskForProgramSession,
    programSessionId: number,
  ) {
    const freshSessionTask = this.sessionTaskRep.create({
      isDeleted: false,
      order: index,
      isReusable: false,
      status: TaskStatus.INLINE,
      taskColor: 'red',
      programSession: { programSessionId },
      taskDuration: duration,
      taskName,
      taskDescription: 'very long text',
    });
    return await this.saveSessionTask(freshSessionTask);
  }

  public async updateSessionTask(
    { taskName, duration }: UpdateTask,
    sessionTaskId: number,
  ) {
    const updated = await this.sessionTaskRep
      .createQueryBuilder('session_task')
      .update()
      .set({ taskName, taskDuration: duration })
      .where('session_task.sessionTaskId = :sessionTaskId', { sessionTaskId })
      .execute();

    return updated;
  }

  public async saveEndResults(sessionTasks: IFinalResult[]) {
    return await this.sessionTaskRep.save(sessionTasks);
  }

  public async addTaskToTheProgramSession(
    task: Task,
    programSessionId: number,
    index: number,
  ) {
    console.log('INDEXXXXXXXXXX  ', task.order, index);
    const createdSessionTask = this.sessionTaskRep.create({
      ...task,
      programSession: { programSessionId },
      order: index,
    });
    return await this.saveSessionTask(createdSessionTask);
  }

  public async getCountdownSession(userId: number): Promise<CountdownSession> {
    return await this.countdonwnSessionRep.findOne({
      where: { user: { userId } },
    });
  }

  public async createSessionInstance(userId: number) {
    const newCountdownSession = this.countdonwnSessionRep.create({
      user: { userId },
    });
    return await this.saveCountdownSession(newCountdownSession);
  }

  public async createProgramSessionInstance(
    programId: number,
    countdownSessionId: number,
    index: number = 1,
  ) {
    const newProgramSession = this.programSessionRep.create({
      program: { programId },
      session: { countdownSessionId },
      programOrder: index,
    });
    return await this.saveProgramSession(newProgramSession);
  }

  public async saveCountdownSession(countdownSession: CountdownSession) {
    return await this.countdonwnSessionRep.save(countdownSession);
  }

  public async createSessionTasks(
    tasks: ProgramTask[],
    programSessionId: number,
  ) {
    return this.sessionTaskRep
      .createQueryBuilder('session_task')
      .insert()
      .values([
        ...tasks.flatMap((t) => {
          const { task, ...rest } = t;

          return {
            ...task,
            order: rest.order,
            programSession: { programSessionId },
          };
        }),
      ])
      .execute();
  }

  public async getSessionProgramsWithTasks(countdownSessionId: number) {
    return await this.countdonwnSessionRep
      .createQueryBuilder('countdown_session')
      .leftJoinAndSelect(
        'countdown_session.programSessions',
        'program_session',
        'program_session.sessionDeleted = false',
      )
      .leftJoinAndSelect('program_session.program', 'program')
      .leftJoinAndSelect(
        'program_session.tasks',
        'session_task',
        'session_task.isDeleted = false',
      )
      .orderBy('session_task.order', 'ASC')
      .addOrderBy('program_Session.programOrder', 'ASC')
      .where('countdown_session.countdownSessionId = :countdownSessionId', {
        countdownSessionId,
      })

      .getOne();
  }

  public async deleteProgram(programSessionId: number, programId: number) {
    return await this.programSessionRep
      .createQueryBuilder('program_session')
      .update()
      .set({ sessionDeleted: true })
      .where(
        'program_session.programSessionId = :programSessionId and program_session.program = :programId',
        { programId, programSessionId },
      )
      .execute();
  }

  public async createProgramForSession(
    countdownSessionId: number,
    programId: number,
    programOrder: number,
  ) {
    const newSession = this.programSessionRep.create({
      session: { countdownSessionId },
      program: { programId },
      programOrder,
    });
    return await this.saveProgramSession(newSession);
  }

  public async deleteTask(sessionTaskId: number) {
    return await this.sessionTaskRep
      .createQueryBuilder('session_task')
      .update()
      .set({ isDeleted: true })
      .where('session_task.sessionTaskId = :sessionTaskId', { sessionTaskId })
      .execute();
  }

  /*public async updateSessionTask(
    sessioTaskId: number,
    fields: Partial<SessionTask>,
  ) {
    return await this.sessionTaskRep
      .createQueryBuilder('session_task')
      .update()
      .set(fields)
      .where('session_task.sessionTaskId = :sessionTaskId', { sessioTaskId })
      .execute();
  }*/

  public async createSessionTaskForProgramSession(
    programSessionId: number,
    fields: Partial<SessionTask>,
  ) {
    const newSessionTask = this.sessionTaskRep.create({
      ...fields,
      programSession: { programSessionId },
    });
    return await this.saveSessionTask(newSessionTask);
  }

  public async saveSessionTask(sessionTask: SessionTask) {
    return await this.sessionTaskRep.save(sessionTask);
  }

  public async getProgramSessionWithSessionTasks(programSessionId: number) {
    return await this.programSessionRep
      .createQueryBuilder('program_session')
      .leftJoinAndSelect('program_session.program', 'program')
      .leftJoinAndSelect(
        'program_session.tasks',
        'session_task',
        'session_task.isDeleted = false',
      )
      .where('program_session.programSessionId = :programSessionId', {
        programSessionId,
      })
      .getOne();
  }

  public convertProgramTasksToSessionTasks(
    programTasks: ProgramTask[],
    programSessionId: number,
  ): SessionTask[] {
    const convertedSessionTasks: SessionTask[] = [];

    for (const programTask of programTasks) {
      const { task, ...rest } = programTask;
      const newSessionTask: SessionTask = {
        taskName: task.taskName,
        isDeleted: false,
        isReusable: task.isReusable,
        taskColor: task.taskColor,
        taskDuration: task.taskDuration,
        taskDescription: task.taskDescription,
        status: TaskStatus.INLINE,
        programSession: { programSessionId } as ProgramSession,
        order: rest.order || task.order,
      } as SessionTask;
      convertedSessionTasks.push(newSessionTask);
    }

    return convertedSessionTasks;
  }

  public async saveProgramSession(programSession: ProgramSession) {
    return await this.programSessionRep.save(programSession);
  }
}

/*return await this.sessionTaskRep.insert(
      tasks.map((t) => this.sessionTaskRep.create({ ...t })),
    );*/

// public async createSessionTasks(tasks: Task[], programSessionId: number) {
//   return this.sessionTaskRep
//     .createQueryBuilder('session_task')
//     .insert()
//     .values([
//       ...tasks.flatMap((t) => {
//         const { programtask, ...rest } = t;
//         return programtask.map((pt) => ({
//           ...rest,
//           programSession: { programSessionId },
//           order: pt.order,
//         }));
//       }),
//     ])
//     .execute();
// }

/* return await this.countdonwnSessionRep.findOne({
      relations: { programSessions: { tasks: true, program: true } },
      where: {
        countdownSessionId,
        programSessions: { sessionDeleted: false, tasks: { isDeleted: false } },
      },
      order: {
        programSessions: { programOrder: 'ASC', tasks: { order: 'ASC' } },
      },
    });*/

// .andWhere('program_session.sessionDeleted = false')
// .andWhere('session_task.isDeleted = false')
