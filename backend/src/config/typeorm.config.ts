import { ConfigService } from '@nestjs/config'
import { TypeOrmModuleOptions } from '@nestjs/typeorm'

export const getTypeOrmConfig = async (
	configService: ConfigService,
): Promise<TypeOrmModuleOptions> => ({
	type: 'postgres',
	host: configService.get<string>('DB_HOST'),
	port: configService.get<number>('DB_PORT'),
	database: configService.get<string>('DB_NAME'),
	username: configService.get<string>('DB_USERNAME'),
	password: configService.get<string>('DB_PASSWORD'),
	autoLoadEntities: true,
	synchronize: true,
})
