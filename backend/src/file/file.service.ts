import { BadRequestException, Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import * as fs from 'fs'
import { join } from 'path'
import { Repository } from 'typeorm'
import { CreateDirectoryDto } from './dto/file.dto'
import { FileEntity } from './entities/file.entity'
import { STATIC_FILE_PATH } from './file.config'

@Injectable()
export class FileService {
	constructor(
		@InjectRepository(FileEntity)
		private readonly fileRepository: Repository<FileEntity>,
	) {}

	async createDirectory(userId: number, dto: CreateDirectoryDto) {
		const newDir = await this.fileRepository.create({
			fileName: dto.fileName,
			fileSize: dto.fileSize ? dto.fileSize : 0,
			parent: { id: dto.parentId }, // 0 - root dir
			user: { id: userId },
		})

		Logger.log('parentId ' + JSON.stringify(dto.parentId))

		const parentFile =
			dto.parentId !== undefined
				? await this.fileRepository.findOneBy({ id: dto.parentId })
				: undefined

		Logger.log('parent ' + JSON.stringify(parentFile))

		if (!parentFile) newDir.filePath = dto.fileName
		else newDir.filePath = `${parentFile.filePath}\\${newDir.fileName}`

		await this.createDirLocally(newDir)
		await this.fileRepository.save(newDir)
	}

	async getFiles(userId: number, filePath: string) {
		let dir
		if (filePath === undefined) dir = join(STATIC_FILE_PATH, `user_${userId}`)
		else dir = join(STATIC_FILE_PATH, `user_${userId}`, filePath)
		try {
			await fs.readdirSync(dir).forEach(file => {
				Logger.log(file)
			})
		} catch (e) {
			throw new BadRequestException(e.message)
		}
	}

	async createDirLocally(file: FileEntity) {
		const filePath = `${STATIC_FILE_PATH}\\user_${file.user.id}\\${file.filePath}`
		if (fs.existsSync(filePath))
			throw new BadRequestException('Директория уже существует')
		fs.mkdirSync(filePath, { recursive: true })
	}
}
