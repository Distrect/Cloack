import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { ReusableTask } from '../reusable/reusableTask.entity';
import { ProgramTask } from '../programtask/programTask.entity';
import { User } from '../user/user.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  taskId: string;

  @Column('integer')
  order: number;

  @Column('varchar')
  taskName: string;

  @Column('text')
  taskDescription: string;

  @Column('time')
  taskDuration: string;

  @Column('varchar')
  taskColor: string;

  @Column({ type: 'boolean', default: false })
  isReusable: boolean;

  @OneToMany(() => ProgramTask, (pt) => pt.task)
  programtask: ProgramTask[];

  @ManyToOne(() => User, (u) => u.tasks)
  user: User;
}
