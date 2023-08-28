import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TagEntityModule } from 'src/database/entities/tag/tagEntity.module';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';
import { CookieChecker } from 'src/middleware/cookieMiddleware/cookie.middleware';
import { JwtAuthModule } from 'src/services/jwt/jwt.module';

@Module({
  imports: [TagEntityModule, JwtAuthModule],
  providers: [TagService],
  exports: [],
  controllers: [TagController],
})
export class TagModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CookieChecker)
      .forRoutes('tag/getTags', 'tag/updateTag', 'tag/deleteTag');
  }
}
