import { Module } from '@nestjs/common';
import { JwtAuthModule } from 'src/services/jwt/jwt.module';
import { MessageGateway } from './message.gateway';
import { ClientStorageModule } from '../clientStorage/clientStorage.module';
import { MessageEntityModule } from 'src/database/entities/messsage/messageEntity.module';

@Module({
  imports: [JwtAuthModule, ClientStorageModule, MessageEntityModule],
  providers: [MessageGateway],
  exports: [MessageGateway],
})
export class MessageSocketModule {}
