import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { messageProvider } from './message.provider';
import { MessageEntityService } from './messageEntity.service';

@Module({
  imports: [DatabaseModule],
  exports: [MessageEntityService],
  providers: [...messageProvider, MessageEntityService],
})
export class MessageEntityModule {}
