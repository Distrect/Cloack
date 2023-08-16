import { Module } from '@nestjs/common';
import { programTaskProvider } from './programTask.provider';
import { ProgramTaskEntityService } from './programTaskEntityService.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [...programTaskProvider, ProgramTaskEntityService],
  exports: [ProgramTaskEntityService],
})
export class ProgramTaskEntityModule {}
