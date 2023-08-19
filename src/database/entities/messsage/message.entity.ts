import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Friendship } from '../friendship/friendship.entity';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  messageId: number;

  @Column({ type: 'text' })
  message: string;

  @Column('integer')
  from: number;

  @Column('integer')
  to: number;

  @ManyToOne(() => Friendship, (f) => f)
  friendship: Friendship;
}
