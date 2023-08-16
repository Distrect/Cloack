// import {
//   Entity,
//   PrimaryGeneratedColumn,
//   Column,
//   ManyToOne,
//   JoinColumn,
// } from 'typeorm';
// import { OrderProgram } from '../orderprogram/orderprogram.entity';
// import { Task } from '../task/task.entity';

// @Entity()
// export class OrderTask {
//   @PrimaryGeneratedColumn()
//   orderTaskId: number;

//   @ManyToOne(() => OrderProgram, (orderProgram) => orderProgram.orderId)
//   @JoinColumn({ name: 'order_id' })
//   order_id: number;

//   @ManyToOne(() => Task, (task) => task.taskId)
//   @JoinColumn()
//   task_id: number;

//   @Column('integer')
//   order: number;
// }
