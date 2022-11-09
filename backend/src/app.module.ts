import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MulterModule } from '@nestjs/platform-express'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from './auth/auth.module'
import { getTypeOrmConfig } from './config/typeorm.config'
import { STATIC_FILE_PATH } from './file/file.config'
import { FileModule } from './file/file.module'
import { UserModule } from './user/user.module'

@Module({
  imports: [
    MulterModule.register({ dest: STATIC_FILE_PATH }),
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getTypeOrmConfig,
    }),
    UserModule,
    AuthModule,
    FileModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
