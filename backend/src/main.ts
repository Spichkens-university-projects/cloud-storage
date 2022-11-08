import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import * as createRedisStore from "connect-redis";
import * as cookieParser from "cookie-parser";
import * as session from "express-session";
import * as passport from "passport";
import { createClient } from "redis";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const RedisStore = createRedisStore(session);
  const redisClient = createClient({
    host: "localhost",
    port: 6379
  });

  app.use(
    session({
      store: new RedisStore({ client: redisClient }),
      secret: configService.get("SESSION_SECRET"),
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 3600000, secure: false, httpOnly: false }
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  app.use(cookieParser());
  app.enableCors({
    credentials: true
  });
  app.setGlobalPrefix("api");
  await app.listen(3001);
}

bootstrap();
