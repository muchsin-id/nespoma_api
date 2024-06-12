import * as bodyParser from 'body-parser';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { swaggerSetup } from '@custom/configs';
import { globalMiddleware } from '@custom/middlewares';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    abortOnError: false,
  });

  swaggerSetup('docs', app);

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(globalMiddleware);
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
