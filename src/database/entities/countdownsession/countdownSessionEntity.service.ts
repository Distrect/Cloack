import { ProgramSession } from '../programsession/programSession.entity';
import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CountdownSession } from './countdownSession.entity';
import { SessionTask } from '../sessiontask/sessionTask.entity';
import { Task } from '../task/task.entity';

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

  public async createSessionInstance(userId: number) {
    const newCountdownSession = this.countdonwnSessionRep.create({
      user: { userId },
    });
    return await this.saveCountdownSession(newCountdownSession);
  }

  public async createProgramSessionInstance(programId: number) {
    const newProgramSession = this.programSessionRep.create({
      program: { programId },
      programOrder: 1,
    });
    return await this.saveProgramSession(newProgramSession);
  }

  public async saveCountdownSession(countdownSession: CountdownSession) {
    return await this.countdonwnSessionRep.save(countdownSession);
  }

  public async saveProgramSession(programSession: ProgramSession) {
    return await this.programSessionRep.save(programSession);
  }

  public async createSessionTasks(tasks: Task[], programSessionId: number) {
    return this.sessionTaskRep
      .createQueryBuilder('session_task')
      .insert()
      .values([
        ...tasks.flatMap((t) => {
          const { programtask, ...rest } = t;
          return programtask.map((pt) => ({
            ...rest,
            programSession: { programSessionId },
            order: pt.order,
          }));
        }),
      ])
      .execute();
  }

  public async getSessionProgramsWithTasks(countdownSessionId: number) {
    return await this.countdonwnSessionRep.findOne({
      relations: { programSessions: { tasks: true, program: true } },
      where: {
        countdownSessionId,
        programSessions: { sessionDeleted: false, tasks: { isDeleted: false } },
      },
      order: {
        programSessions: { programOrder: 'ASC', tasks: { order: 'ASC' } },
      },
    });
  }

  public async deleteProgram(programSessionId, programId) {
    return await this.programSessionRep
      .createQueryBuilder('program_session')
      .update()
      .set({ sessionDeleted: true })
      .where(
        'program_session.prgramSessionId = :programSessionId and program_session.program :programId',
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

  public async updateSessionTask(
    sessioTaskId: number,
    fields: Partial<SessionTask>,
  ) {
    return await this.sessionTaskRep
      .createQueryBuilder('session_task')
      .update()
      .set(fields)
      .where('session_task.sessionTaskId = :sessionTaskId', { sessioTaskId })
      .execute();
  }

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
}

/*return await this.sessionTaskRep.insert(
      tasks.map((t) => this.sessionTaskRep.create({ ...t })),
    );*/
