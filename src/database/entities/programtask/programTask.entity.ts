import {
  Entity,
  Column,
  JoinColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { Program } from '../program/program.entity';
import { Task } from '../task/task.entity';
import { Tag } from '../tag/tag.entity';

@Entity()
export class ProgramTask {
  @PrimaryGeneratedColumn()
  programTaskId: number;

  @ManyToOne(() => Program)
  @JoinColumn({ name: 'program' })
  program: Program;

  @ManyToOne(() => Task, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'task' })
  task: Task;

  @Column('integer')
  order: number;

  @Column({ type: 'boolean', default: false })
  isReusable: boolean;
}
