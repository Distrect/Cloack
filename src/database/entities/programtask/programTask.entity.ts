import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Program } from '../program/program.entity';

@Entity()
export class ProgramTask {
  @PrimaryGeneratedColumn()
  programTaskId: number;

  @ManyToOne(() => Program, (program) => program.programId)
  @JoinColumn({ name: 'program_id' })
  program_id: number;

  @Column('varchar')
  order: number;

  @Column('varchar')
  taskName: number;

  @Column('text')
  taskDescription: string;

  @Column('time')
  taskDuration: string;

  @Column('varchar')
  taskColor: string;

  @Column('varchar')
  taskGroup: string;
}
