import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import * as fs from 'fs'
import { Any, Repository } from 'typeorm'
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
      parent: { id: dto.parentId },
      user: { id: userId },
    })

    const parentFile =
      dto.parentId !== undefined
        ? await this.fileRepository.findOneBy({ id: dto.parentId })
        : undefined

    if (!parentFile) newDir.filePath = dto.fileName
    else newDir.filePath = `${parentFile.filePath}\\${newDir.fileName}`

    await this.createDirLocally(newDir)
    return await this.fileRepository.save(newDir)
  }

  async getFiles(userId: number, parentId: number) {
    if (typeof parentId === undefined)
      return await this.getFilesFromRoot(userId)
    let files
    const pid = parentId != 0 ? { id: parentId } : null
    try {
      files = await this.fileRepository.find({
        where: {
          user: { id: userId },
          parent: pid,
        },
        relations: {
          parent: true,
        },
      })
      return files
    } catch (e) {
      throw new BadRequestException(e.message)
    }
  }

  async getFilesFromRoot(userId: number) {
    const files: string[] = []
    const filePath = `${STATIC_FILE_PATH}\\user_${userId}`
    if (!fs.existsSync(filePath))
      throw new BadRequestException('Директории пользователя не существует')
    fs.readdirSync(filePath).forEach(file => files.push(file))
    try {
      return await this.fileRepository.find({
        where: {
          user: { id: userId },
          filePath: Any(files),
        },
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

  async uploadFile(file: Express.Multer.File) {
    await this.fileRepository.create({
      fileName: file.originalname,
      filePath: file.path,
    })
  }
}
