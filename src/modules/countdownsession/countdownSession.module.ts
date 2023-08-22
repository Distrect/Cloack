import { Module } from '@nestjs/common';
import { CountdownSessionEntityModule } from 'src/database/entities/countdownsession/countdownSessionEntity.module';
import { CountdownSessionController } from './countdownSession.controler';
import { TaskEntityModule } from 'src/database/entities/task/task.module';
import { CountdownSessionService } from './countdownSession.service';

@Module({
  imports: [CountdownSessionEntityModule, TaskEntityModule],
  providers: [CountdownSessionService],
  controllers: [CountdownSessionController],
})
export class CountdownSessionModule {}
