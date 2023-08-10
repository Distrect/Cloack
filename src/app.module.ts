import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
// import { userProvider } from './database/entities/user/user.provider';
// import { settingProvider } from './database/entities/setting/setting.provider';
// import { tagProvider } from './database/entities/tag/tag.provider';
// import { programProvider } from './database/entities/program/program.provider';
// import { programTaskProvider } from './database/entities/programtask/programTask.provider';
// import { reusableTaskProvider } from './database/entities/reusable/reusableTask.provider';
// import { databaseProviders } from './database/database.provider';

@Module({
  imports: [UserModule, ConfigModule.forRoot({ isGlobal: true })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // console.log(consumer);
  }
}
