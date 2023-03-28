import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser'


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.use(cookieParser());
  
  app.enableCors({
  origin : ["http://localhost:3000"],
  credentials: true
  })
  await app.listen(8000);
  Logger.log(`Application running on port ${8000}`)
}
bootstrap();
