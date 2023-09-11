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
  RelationId,
  VirtualColumn,
  JoinTable,
} from 'typeorm';
import { Tag } from '../tag/tag.entity';
import { User } from '../user/user.entity';
import { ProgramTask } from '../programtask/programTask.entity';
import { Calendar } from '../calendar/calendar.entity';
import { ProgramSession } from '../programsession/programSession.entity';
import { ProgramCalendar } from '../ProgramCalendar/programCalendarEntity.entity';
import { Task } from '../task/task.entity';

export abstract class ProgramBase {
  @Column('varchar')
  programName: string;

  @Column('text')
  programDescription: string;

  @Column({ type: 'boolean', default: false })
  isDeleted: boolean;

  @Column({ type: 'integer', default: 1 })
  version: number;

  @Column({
    select: false,
    nullable: true,
    insert: false,
    update: false,
    type: 'varchar',
  })
  total: string;

  public totalsDuration: number;
}

@Entity()
@Unique(['programName'])
export class Program extends ProgramBase {
  @Index()
  @PrimaryGeneratedColumn()
  programId: number;

  tasks: Task[];
  @OneToOne(() => Tag, { onDelete: 'SET NULL' })
  @JoinColumn()
  tag: Tag;

  @ManyToOne(() => User, (user) => user.programs)
  @JoinColumn({ name: 'user' })
  user: User;

  @RelationId((program: Program) => program.user)
  userId: number;

  @OneToMany(() => ProgramTask, (pt) => pt.program)
  programtask: ProgramTask[];

  @OneToMany(() => Calendar, (c) => c.program)
  calendar: Calendar[];

  @OneToMany(() => ProgramSession, (ps) => ps.program)
  sessions: ProgramSession[];

  @OneToMany(() => ProgramCalendar, (pc) => pc.program)
  programCalendar: ProgramCalendar[];
}
