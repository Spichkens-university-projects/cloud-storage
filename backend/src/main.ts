import { AppModule } from './app.module'
import { NestFactory } from '@nestjs/core'
import * as bodyParser from 'body-parser'
import * as cookieParser from 'cookie-parser'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.use(bodyParser())
  app.use(cookieParser())
  app.enableCors({
    credentials: true,
    origin: 'http://localhost:3000',
  })
  app.setGlobalPrefix('api')
  await app.listen(3001)
}

bootstrap()
