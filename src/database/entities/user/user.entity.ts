import {
  Entity,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  BeforeInsert,
  Index,
  JoinColumn,
} from 'typeorm';
import { Tag } from '../tag/tag.entity';
import { Program } from '../program/program.entity';
import { Task } from '../task/task.entity';
import { Calendar } from '../calendar/calendar.entity';
import { Friendship } from '../friendship/friendship.entity';
import { Notification } from '../notification/notification.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @Index({ fulltext: true })
  @Column('varchar')
  name: string;

  @Index({ fulltext: true })
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

  @Index({ fulltext: true })
  @Column({ type: 'varchar', default: '' })
  fullname: string;

  @OneToMany(() => Tag, (tag) => tag.user)
  tags: Tag[];

  @OneToMany(() => Program, (program) => program.user)
  programs: Program[];

  @OneToMany(() => Task, (t) => t.user)
  @JoinColumn({ name: 'user', referencedColumnName: 'user' })
  tasks: Task[];

  @OneToMany(() => Calendar, (c) => c.user)
  calendar: Calendar[];

  @OneToMany(() => Friendship, (f) => f.sender)
  sendFriend: Friendship[];

  @OneToMany(() => Friendship, (f) => f.receiver)
  receiveFriend: Friendship[];

  @OneToMany(() => Notification, (n) => n.user)
  notification: Notification[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  addFullName() {
    this.fullname = this.name + ' ' + this.lastname;
  }
}
