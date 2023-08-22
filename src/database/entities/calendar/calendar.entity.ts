import { Program } from './../program/program.entity';
import {
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Calendar {
  @Index()
  @PrimaryGeneratedColumn()
  calendarId: number;

  /*@Column('date')
  startDate: Date;*/

  @ManyToOne(() => Program, (pr) => pr.calendar)
  @JoinColumn({ name: 'program' })
  program: Program;

  /*@ManyToOne(() => User, (u) => u.calendar)
  @JoinColumn({ name: 'user' })
  user: User;*/
}
