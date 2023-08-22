import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';

import { countdownSessionProvider } from './countdownSession.provider';
import { programSessionProvider } from '../programsession/programSession.provider';
import { sessionTaskProvider } from '../sessiontask/sessionTask.provider';
import { CountdownSessionEntityService } from './countdownSessionEntity.service';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...countdownSessionProvider,
    ...programSessionProvider,
    ...sessionTaskProvider,
    CountdownSessionEntityService,
  ],
  exports: [CountdownSessionEntityService],
})
export class CountdownSessionEntityModule {}
