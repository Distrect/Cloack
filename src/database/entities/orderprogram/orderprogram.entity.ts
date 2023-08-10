import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Program } from '../program/program.entity';

@Entity()
export class OrderProgram {
  @PrimaryGeneratedColumn()
  orderId: number;

  @ManyToOne(() => User, (user) => user.userId)
  @JoinColumn({ name: 'user_id' })
  user_id: number;

  @ManyToOne(() => Program, (program) => program.programId)
  @JoinColumn({ name: 'program_id' })
  program_id: number;

  @Column('integer')
  order: number;
}
