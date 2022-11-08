import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UserEntity } from './entities/user.entity'

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(UserEntity)
		private readonly userRepositury: Repository<UserEntity>,
	) {}

	async getById(id: number) {
		const user = await this.userRepositury.findOne({
			where: { id },
		})

		if (!user) throw new NotFoundException('Пользователь не был найден')
		return user
	}

	async getAll() {
		return this.userRepositury.find()
	}
}
