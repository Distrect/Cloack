import { ProgramBase } from './program.entity';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SharedProgram extends ProgramBase {
  @PrimaryGeneratedColumn()
  sharedProgramId: number;

  /* @Column('integer')
  tag: number;*/

  @Column('integer')
  userId: number;

  @Column('integer')
  version: number;
}

/*import {
  AuditingAction,
  AuditingEntity,
  AuditingEntityDefaultColumns,
} from 'typeorm-auditing';
import { Program } from './program.entity';

@AuditingEntity(Program)
export class AuditingProgram
  extends Program
  implements AuditingEntityDefaultColumns
{
  readonly _seq!: number;
  readonly _action!: AuditingAction;
  readonly _modifiedAt!: Date;
}
*/
