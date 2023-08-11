import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { GlobalConfigModule } from 'src/config/config.module';

@Module({
  imports: [GlobalConfigModule],
  exports: [MailService],
  providers: [MailService],
})
export class MailModule {}
