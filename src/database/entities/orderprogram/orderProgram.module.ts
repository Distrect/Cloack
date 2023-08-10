import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { OrderProgramProvider } from './orderProgram.provider';
import { OrderProgramService } from './orderProgram.service';

@Module({
  imports: [DatabaseModule],
  exports: [OrderProgramService],
  providers: [...OrderProgramProvider, OrderProgramService],
})
export class OrderProgramModule {}
