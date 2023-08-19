import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { friendShipProvider } from './friendship.provider';
import { FriendShipEntityService } from './friendShipEntity.service';

@Module({
  imports: [DatabaseModule],
  exports: [FriendShipEntityService],
  providers: [...friendShipProvider, FriendShipEntityService],
})
export class FriendshipEntityModule {}
