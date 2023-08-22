import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  Index,
} from 'typeorm';
import { User } from '../user/user.entity';
import { ProgramSession } from '../programsession/programSession.entity';

@Entity()
export class CountdownSession {
  @Index()
  @PrimaryGeneratedColumn()
  countdownSessionId: number;

  @ManyToOne(() => User, (user) => user)
  user: User;

  @OneToMany(() => ProgramSession, (ps) => ps.session)
  programSessions: ProgramSession[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
