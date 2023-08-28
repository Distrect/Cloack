import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { GlobalErrorHandler } from './error/errorHandler';
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';
import * as cookieParser from 'cookie-parser';
import * as compression from 'compression';
import helmet from 'helmet';
import { CryptoUtil } from './utils/crypto.util';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bodyParser: true });

  const config = new DocumentBuilder()
    .setTitle('Cloack Api')
    .setDescription('Organize your time')
    .addBearerAuth()
    .setBasePath('api')
    .build();

  const docs = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/doc', app, docs);

  app.setGlobalPrefix('api');
  app.useLogger(app.get(Logger));
  app.useGlobalInterceptors(new LoggerErrorInterceptor());
  app.enableCors({ origin: 'http://localhost:5173', credentials: true }); //Frontend domainini yaz //array olarak koy //credentials //methods
  app.use(helmet());
  app.use(cookieParser('2c9344c1997c9b0470783ddbe1903c8b'));
  app.use(compression());
  app.useGlobalFilters(new GlobalErrorHandler());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
