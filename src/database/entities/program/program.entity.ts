import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Tag } from '../tag/tag.entity';
import { User } from '../user/user.entity';
import { OrderProgram } from '../orderprogram/orderprogram.entity';

@Entity()
export class Program {
  @OneToMany(() => OrderProgram, (orderProgram) => orderProgram.program_id)
  @PrimaryGeneratedColumn()
  programId: number;

  @OneToOne(() => Tag, { nullable: true })
  @JoinColumn({ name: 'tag_id' })
  tag_id: number;

  @ManyToOne(() => User, (user) => user.userId)
  @JoinColumn({ name: 'user_id' })
  user_id: string;

  @Column('varchar')
  programName: string;

  @Column('text')
  programDescription: string;

  @Column('varchar')
  programGroup: string;
}
