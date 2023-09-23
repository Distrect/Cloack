import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TaskBase } from '../task/task.entity';
import { ProgramSession } from '../programsession/programSession.entity';

export enum TaskStatus {
  COMPLETED = 'Completed',
  SKIPPED = 'Skipped',
  UNCOMPLETED = 'Uncompleted',
  INLINE = 'Inline',
}

@Entity()
export class SessionTask extends TaskBase {
  @Index()
  @PrimaryGeneratedColumn()
  sessionTaskId: number;

  @Column({ type: 'bigint', nullable: true })
  elapsed?: number;

  @Column({ type: 'enum', enum: TaskStatus, default: TaskStatus.INLINE })
  status: TaskStatus;

  @Column({ type: 'boolean', default: false })
  isDeleted: boolean;

  @ManyToOne(() => ProgramSession, (ps) => ps.tasks)
  @JoinColumn({ name: 'programSession' })
  programSession: ProgramSession;
}
