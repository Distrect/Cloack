import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { TagEntityService } from './tagEntity.service';
import { tagProvider } from './tag.provider';

@Module({
  imports: [DatabaseModule],
  providers: [...tagProvider, TagEntityService],
  exports: [TagEntityService],
})
export class TagEntityModule {}
