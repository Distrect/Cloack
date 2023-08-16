import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  OneToMany,
  JoinColumn,
  Unique,
  Index,
} from 'typeorm';
import { Tag } from '../tag/tag.entity';
import { User } from '../user/user.entity';
import { ProgramTask } from '../programtask/programTask.entity';
import { Calendar } from '../calendar/calendar.entity';

export abstract class ProgramBase {
  @Column('varchar')
  programName: string;

  @Column('text')
  programDescription: string;

  @Column({ type: 'boolean', default: false })
  isDeleted: boolean;
  @Column({ type: 'integer', default: 1 })
  version: number;
}

@Entity()
@Unique(['programName'])
export class Program extends ProgramBase {
  @Index()
  @PrimaryGeneratedColumn()
  programId: number;

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
}
