import { Program } from './../program/program.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  Index,
  JoinColumn,
} from 'typeorm';
import { CountdownSession } from '../countdownsession/countdownSession.entity';
import { SessionTask } from '../sessiontask/sessionTask.entity';

@Entity()
export class ProgramSession {
  @Index()
  @PrimaryGeneratedColumn()
  programSessionId: number;

  @Column('integer')
  programOrder: number;

  @ManyToOne(() => Program, (program) => program)
  @JoinColumn({ name: 'program' })
  program: Program;

  @ManyToOne(() => CountdownSession, (cds) => cds)
  session: CountdownSession;

  @OneToMany(() => SessionTask, (st) => st.programSession)
  tasks: SessionTask[];

  @Column({ type: 'boolean', default: false })
  sessionDeleted: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
