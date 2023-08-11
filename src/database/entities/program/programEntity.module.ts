import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { ProgramEntityService } from 'src/database/entities/program/programEntity.service';
import { programProvider } from './program.provider';

@Module({
  imports: [DatabaseModule],
  providers: [...programProvider, ProgramEntityService],
  exports: [ProgramEntityService],
})
export class ProgramEntityModule {}
