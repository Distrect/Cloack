import {
  Entity,
  Column,
  JoinColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  RelationId,
} from 'typeorm';
import { Program } from '../program/program.entity';
import { Task } from '../task/task.entity';

export abstract class ProgramTaskBase {
  @Column('integer')
  order: number;

  @Column({ type: 'boolean', default: false })
  isReusable: boolean;
}

@Entity()
export class ProgramTask extends ProgramTaskBase {
  @PrimaryGeneratedColumn()
  programTaskId: number;

  @ManyToOne(() => Program)
  @JoinColumn({ name: 'program' })
  program: Program;

  @ManyToOne(() => Task, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'task' })
  task: Task;

  @RelationId((pt: ProgramTask) => pt.program)
  programId: number;

  @RelationId((pt: ProgramTask) => pt.task)
  taskId: number;
}
