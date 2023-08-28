import { Module } from '@nestjs/common';
import { ClientStorageService } from './clientStorage.service';

@Module({
  providers: [ClientStorageService],
  exports: [ClientStorageService],
})
export class ClientStorageModule {}
