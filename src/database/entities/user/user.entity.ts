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

@Entity()
export class User {
  @OneToMany(() => OrderProgram, (orderProgram) => orderProgram.user_id)
  @OneToMany(() => Program, (program) => program.user_id)
  @OneToMany(() => Tag, (tag) => tag.user_id)
  @PrimaryGeneratedColumn()
  userId: number;

  @Column('varchar')
  name: string;

  @Column('varchar')
  lastname: string;

  @Column('varchar')
  email: string;

  @Column('varchar')
  password: string;

  @Column('varchar')
  digits: string;

  @Column({ type: 'boolean', default: false })
  isAuthenticated: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
