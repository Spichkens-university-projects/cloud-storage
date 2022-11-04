import { Logger } from "@nestjs/common";
import { NestFactory } from '@nestjs/core';
import { AppModule } from "./app.module";
import * as cookieParser from 'cookie-parser'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {logger: new Logger()});
  app.use(cookieParser());
  app.enableCors({
    credentials: true
  });
  app.setGlobalPrefix('api');
  await app.listen(3001);
}
bootstrap();
