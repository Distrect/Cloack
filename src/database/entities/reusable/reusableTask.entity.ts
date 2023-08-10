import {
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  Column,
} from 'typeorm';
import { Program } from '../program/program.entity';
import { Task } from '../task/task.entity';

@Entity({ name: 'reusableTask' })
export class ReusableTask {
  @PrimaryGeneratedColumn()
  resusableId: number;

  @ManyToOne(() => Task, (task) => task.taskId)
  @JoinColumn({ name: 'task_id' })
  task_id: number;

  @ManyToOne(() => Program, (program) => program.programId)
  @JoinColumn({ name: 'program_id' })
  program_id: number;

  @Column('integer')
  order: number;
}
