import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user/user.entity';

// enum NotificationType{
//     WARNING = "warning",

// }

@Entity()
export class Notification {
  @PrimaryGeneratedColumn()
  notificationId: number;

  @Column({ type: 'boolean', default: false })
  isRead: boolean;

  @Column({ type: 'date', nullable: true })
  seenDate: Date;

  @Column('text')
  message: string;

  @ManyToOne(() => User, (u) => u.notification)
  user: User;
}
