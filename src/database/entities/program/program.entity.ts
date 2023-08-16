import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  OneToMany,
  JoinColumn,
  Unique,
} from 'typeorm';
import { Tag } from '../tag/tag.entity';
import { User } from '../user/user.entity';
import { OrderProgram } from '../orderprogram/orderprogram.entity';
import { ProgramTask } from '../programtask/programTask.entity';
import { ReusableTask } from '../reusable/reusableTask.entity';
import { Calendar } from '../calendar/calendar.entity';

@Entity()
@Unique(['programName'])
export class Program {
  @PrimaryGeneratedColumn()
  programId: number;

  @Column('varchar')
  programName: string;

  @Column('text')
  programDescription: string;

  @Column({ type: 'boolean', default: false })
  isDeleted: boolean;

  @OneToOne(() => Tag, { onDelete: 'SET NULL' })
  @JoinColumn()
  tag: Tag;

  @ManyToOne(() => User, (user) => user.programs)
  @JoinColumn({ name: 'user' })
  user: User;

  @OneToMany(() => ProgramTask, (pt) => pt.program)
  programtask: ProgramTask[];

  @OneToMany(() => Calendar, (c) => c.program)
  calendar: Calendar[];

  // @OneToMany(() => OrderProgram, (orderProgram) => orderProgram.program)
  // orderPrograms: OrderProgram[];

  // @OneToMany(() => ProgramTask, (programTask) => programTask.program)
  // @JoinColumn({ name: 'programTasks' })
  // programTasks: ProgramTask[];

  // @OneToMany(() => ReusableTask, (reusableTask) => reusableTask.program)
  // reusableTasks: ReusableTask[];
}
