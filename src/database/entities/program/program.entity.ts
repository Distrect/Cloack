import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  OneToMany,
  JoinColumn,
  Unique,
} from 'typeorm';
import { Tag } from '../tag/tag.entity';
import { User } from '../user/user.entity';
import { OrderProgram } from '../orderprogram/orderprogram.entity';

@Entity()
@Unique(['programName'])
export class Program {
  // @OneToMany(() => OrderProgram, (orderProgram) => orderProgram.program_id)
  @PrimaryGeneratedColumn()
  programId: number;

  @Column('varchar')
  programName: string;

  @Column('text')
  programDescription: string;

  @Column({ type: 'boolean', default: false })
  isDeleted: boolean;

  @OneToOne(() => Tag)
  @JoinColumn()
  tag: Tag;

  @ManyToOne(() => User, (user) => user.programs)
  user: User;

  @OneToMany(() => OrderProgram, (orderProgram) => orderProgram.program)
  orderPrograms: OrderProgram;

  /*@Column('varchar', { default: 'samet' })
  programGroup: string;*/
}
