import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { taskProvider } from './task.provider';
import { TaskEntityService } from './task.service';

@Module({
  imports: [DatabaseModule],
  providers: [...taskProvider, TaskEntityService],
  exports: [TaskEntityService],
})
export class TaskEntityModule {}
