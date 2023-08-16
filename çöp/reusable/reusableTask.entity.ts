// import {
//   Entity,
//   PrimaryGeneratedColumn,
//   JoinColumn,
//   ManyToOne,
//   Column,
// } from 'typeorm';
// import { Program } from '../program/program.entity';
// import { Task } from '../task/task.entity';

// @Entity({ name: 'reusableTask' })
// export class ReusableTask {
//   @PrimaryGeneratedColumn()
//   resusableId: number;
//   /*
//   @ManyToOne(() => Task, (task) => task.reusableTasks)
//   @JoinColumn({ name: 'task' })
//   task: number;*/
//   /*
//   @ManyToOne(() => Program, (program) => program.reusableTasks)
//   @JoinColumn({ name: 'program' })
//   program: Program;
// */
//   @Column('integer')
//   order: number;
// }
