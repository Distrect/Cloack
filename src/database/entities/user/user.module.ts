import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { userProvider } from './user.provider';
import { UserEntityService } from './user.service';

@Module({
  imports: [DatabaseModule],
  providers: [...userProvider, UserEntityService],
  exports: [UserEntityService],
})
export class UserEntityModule {}
