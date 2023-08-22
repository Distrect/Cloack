import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TaskBase } from './task.entity';

@Entity()
export class SharedTask extends TaskBase {
  @PrimaryGeneratedColumn()
  sharedTaskId: number;

  @Column('integer')
  taskId: number;
  /*
  @Column({ type: 'integer' })
  programTask: number;*/

  @Column({ type: 'integer' })
  userId: number;

  @Column('integer')
  version: number;
}

/*import {
  AuditingAction,
  AuditingEntity,
  AuditingEntityDefaultColumns,
} from 'typeorm-auditing';
import { Task } from './task.entity';
import { BeforeInsert, Column } from 'typeorm';

@AuditingEntity(Task)
export class AuditingTask extends Task implements AuditingEntityDefaultColumns {
  readonly _seq!: number;
  readonly _action!: AuditingAction;
  readonly _modifiedAt!: Date;

  @Column({ type: 'integer', default: 1, nullable: true })
  deneme!: number;

  @BeforeInsert()
  increase() {
    this.deneme = (this.deneme || 2) + 1;
  }
}
*/
