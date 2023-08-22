import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
  RelationId,
} from 'typeorm';
import { ProgramTask } from '../programtask/programTask.entity';
import { User } from '../user/user.entity';

export abstract class TaskBase {
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
}

@Entity()
export class Task extends TaskBase {
  @PrimaryGeneratedColumn()
  taskId: number;
  /*
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
*/

  @Column({ type: 'integer', select: false, nullable: true })
  version: number;

  @OneToMany(() => ProgramTask, (pt) => pt.task)
  programtask: ProgramTask[];

  @ManyToOne(() => User, (u) => u.tasks)
  @JoinColumn()
  user: User;

  @RelationId((task: Task) => task.user)
  userId: number;
}
