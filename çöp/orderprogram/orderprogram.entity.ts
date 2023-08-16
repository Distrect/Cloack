// import {
//   Entity,
//   PrimaryGeneratedColumn,
//   Column,
//   ManyToOne,
//   JoinColumn,
// } from 'typeorm';
// import { User } from '../../src/database/entities/user/user.entity';
// import { Program } from '../../src/database/entities/program/program.entity';

// @Entity()
// export class OrderProgram {
//   @PrimaryGeneratedColumn()
//   orderId: number;
//   /*
//   // @JoinColumn({ name: 'user_id' })
//   @ManyToOne(() => User, (user) => user.orderPrograms)
//   user: User;*/
//   /*
//   @ManyToOne(() => Program, (program) => program.programId)
//   @JoinColumn({ name: 'program_id' })
//   program_id: number;
//   */
//   @Column('integer')
//   order: number;
//   /*
//   @ManyToOne(() => Program, (program) => program.orderPrograms)
//   program: Program;*/
// }
// // export class OrderProgram {
// //   @PrimaryGeneratedColumn()
// //   orderId: number;

// //   @ManyToOne(() => User, (user) => user.userId)
// //   @JoinColumn({ name: 'user_id' })
// //   user_id: number;

// //   @ManyToOne(() => Program, (program) => program.programId)
// //   @JoinColumn({ name: 'program_id' })
// //   program_id: number;

// //   @Column('integer')
// //   order: number;
// // }
