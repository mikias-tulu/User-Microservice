import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { Logger } from '@nestjs/common';
import { ExceptionsFilter } from './common/filters/custom-exceptions.filter';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';

import * as dotenv from 'dotenv';


async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  const logger = new Logger();

  app.useGlobalFilters(new ExceptionsFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());

  await app.listen(3000, () => {
    logger.log('Application is running on port 3000');
  });
}
bootstrap();
