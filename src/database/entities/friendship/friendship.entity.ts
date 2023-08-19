import {
  Entity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Message } from '../messsage/message.entity';

export enum friendShipStatus {
  APPROVED = 1,
  DECLINED = 0,
  WAITING = 2,
}

@Entity()
export class Friendship {
  @PrimaryGeneratedColumn()
  friendshipId: number;

  @Column({
    type: 'enum',
    enum: friendShipStatus,
    default: friendShipStatus.WAITING,
  })
  status: friendShipStatus;

  @ManyToOne(() => User, (u) => u.sendFriend)
  sender: User;

  @ManyToOne(() => User, (u) => u.receiveFriend)
  receiver: User;

  @OneToMany(() => Message, (m) => m.friendship)
  message: Message[];
}
