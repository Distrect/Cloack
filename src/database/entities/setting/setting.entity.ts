import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../user/user.entity';

enum theme {
  DARK = 'dark',
  LIGHT = 'light',
}

@Entity()
export class Setting {
  @PrimaryGeneratedColumn()
  settingId: number;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user_id: number;

  @Column('boolean')
  isWait: boolean;

  @Column('integer')
  waitTime: number;

  @Column({ type: 'enum', enum: theme, default: theme.LIGHT })
  theme: theme;
}
