import { Module } from '@nestjs/common';
import { databaseProviders } from './database.provider';
import { GlobalConfigModule } from 'src/config/config.module';

@Module({
  imports: [GlobalConfigModule],
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
