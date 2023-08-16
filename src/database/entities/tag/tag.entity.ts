import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
@Unique(['tagName'])
export class Tag {
  @PrimaryGeneratedColumn()
  tagId: number;

  @ManyToOne(() => User, (user) => user.tags)
  @JoinColumn({ name: 'user' })
  user: User;

  @Column('varchar')
  tagName: string;

  @Column('varchar')
  tagColor: string;
}
