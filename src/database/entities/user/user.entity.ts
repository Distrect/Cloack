import {
  Entity,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Tag } from '../tag/tag.entity';
import { Program } from '../program/program.entity';
import { OrderProgram } from '../orderprogram/orderprogram.entity';
import { Task } from '../task/task.entity';
import { Calendar } from '../calendar/calendar.entity';

@Entity()
export class User {
  // @OneToMany(() => OrderProgram, (orderProgram) => orderProgram.user_id)
  // @OneToMany(() => Program, (program) => program.user_id)
  // @OneToMany(() => Tag, (tag) => tag.user_id)
  @PrimaryGeneratedColumn()
  userId: number;

  @Column('varchar')
  name: string;

  @Column('varchar')
  lastname: string;

  @Column({ type: 'varchar', nullable: false })
  email: string;

  @Column('varchar')
  password: string;

  @Column({ type: 'json' })
  digits: { digits: number; exprationDate: Date };

  @Column({ type: 'boolean', default: false })
  isAuthenticated: boolean;

  @OneToMany(() => Tag, (tag) => tag.user)
  tags: Tag[];

  @OneToMany(() => Program, (program) => program.user)
  programs: Program[];

  @OneToMany(() => Task, (t) => t.user)
  tasks: Task[];

  @OneToMany(() => Calendar, (c) => c.user)
  calendar: Calendar[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

/*
  @OneToMany(() => OrderProgram, (orderProgram) => orderProgram.user)
  orderPrograms: OrderProgram[];
*/
