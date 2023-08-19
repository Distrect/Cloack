import { Module } from '@nestjs/common';
import { FriendshipEntityModule } from 'src/database/entities/friendship/friendShipEntity.module';
import { FriendShipService } from './friendShip.service';
import { FriendShipController } from './friendShip.controller';
import { UserEntityService } from 'src/database/entities/user/user.service';
import { UserEntityModule } from 'src/database/entities/user/user.module';

@Module({
  controllers: [FriendShipController],
  imports: [FriendshipEntityModule, UserEntityModule],
  exports: [],
  providers: [FriendShipService],
})
export class FriendShipModule {}
