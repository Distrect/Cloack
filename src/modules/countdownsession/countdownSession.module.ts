import { Module } from '@nestjs/common';
import { CountdownSessionEntityModule } from 'src/database/entities/countdownsession/countdownSessionEntity.module';
import { CountdownSessionController } from './countdownSession.controler';
import { TaskEntityModule } from 'src/database/entities/task/task.module';
import { CountdownSessionService } from './countdownSession.service';
import { ProgramTaskEntityModule } from 'src/database/entities/programtask/programTaskEntityModule.module';

@Module({
  imports: [
    CountdownSessionEntityModule,
    TaskEntityModule,
    ProgramTaskEntityModule,
  ],
  providers: [CountdownSessionService],
  controllers: [CountdownSessionController],
})
export class CountdownSessionModule {}
