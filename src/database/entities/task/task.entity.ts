import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  taskId: string;

  @Column('integer')
  order: number;

  @Column('varchar')
  taskName: string;

  @Column('text')
  taskDescription: string;

  @Column('time')
  taskDuration: string;

  @Column('varchar')
  taskColor: string;

  @Column('varchar')
  taskGroup: string;
}
