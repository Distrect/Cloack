import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Program } from '../program/program.entity';
import { Calendar } from '../calendar/calendar.entity';

@Entity()
export class ProgramCalendar {
  @PrimaryGeneratedColumn()
  programCalendarId: number;

  @Column('date')
  startDate: Date;

  @ManyToOne(() => Calendar, (c) => c)
  @JoinColumn({ name: 'calendar' })
  calendar: Calendar;

  @ManyToOne(() => Program, (p) => p)
  @JoinColumn({ name: 'program' })
  program: Program;
}
