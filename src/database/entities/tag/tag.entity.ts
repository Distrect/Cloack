import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  tagId: number;

  @ManyToOne(() => User, (user) => user.tags)
  @JoinColumn()
  user: User;

  @Column('varchar')
  tagName: string;

  @Column('varchar')
  tagColor: string;
}
