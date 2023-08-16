import { DatabaseModule } from 'src/database/database.module';
import { Module } from '@nestjs/common';
import { sharedProgramProvider } from '../program/program.provider';
import { sharedTaskProvider } from '../task/task.provider';
import { sharedProgramTaskProvider } from '../programtask/programTask.provider';
import { SharedEntitiesService } from './shared.service';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...sharedProgramProvider,
    ...sharedTaskProvider,
    ...sharedProgramTaskProvider,
    SharedEntitiesService,
  ],
  exports: [SharedEntitiesService],
})
export class SharedEntitiesModule {}
