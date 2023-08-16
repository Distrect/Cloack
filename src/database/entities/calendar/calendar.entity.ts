import { User } from '../user/user.entity';
import { Program } from './../program/program.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Calendar {
  @PrimaryGeneratedColumn()
  calendarId: number;

  @Column('date')
  startDate: Date;

  @ManyToOne(() => Program, (pr) => pr.calendar)
  @JoinTable({ name: 'program' })
  program: Program;

  @ManyToOne(() => User, (u) => u.calendar)
  @JoinTable({ name: 'user' })
  user: User;
}
