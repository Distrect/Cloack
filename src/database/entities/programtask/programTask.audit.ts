import { ProgramTaskBase } from './programTask.entity';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class SharedProgramTask extends ProgramTaskBase {
  @PrimaryGeneratedColumn()
  sharedProgramTaskId: number;

  @Column('integer')
  programTaskId: number;

  @Column('integer')
  version: number;

  @Column('integer')
  programId: number;

  @Column('integer')
  taskId: number;
}

/*import {
  AuditingAction,
  AuditingEntity,
  AuditingEntityDefaultColumns,
} from 'typeorm-auditing';
import { ProgramTask } from './programTask.entity';

@AuditingEntity(ProgramTask)
export class AuditingProgramTask
  extends ProgramTask
  implements AuditingEntityDefaultColumns
{
  readonly _seq!: number;
  readonly _action!: AuditingAction;
  readonly _modifiedAt!: Date;
}
*/
