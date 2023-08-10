import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { GlobalErrorHandler } from './error/errorHandler';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Cloack Api')
    .setDescription('Organize your time')
    .addBearerAuth()
    .setBasePath('api')
    .build();

  const docs = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/doc', app, docs);

  app.setGlobalPrefix('api');
  app.enableCors(); //Frontend domainini yaz //array olarak koy //credentials //methods
  app.use(helmet());
  app.use(cookieParser('2c9344c1997c9b0470783ddbe1903c8b'));
  app.useGlobalFilters(new GlobalErrorHandler());
  await app.listen(3000);
}
bootstrap();
