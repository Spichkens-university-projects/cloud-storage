import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Response } from 'express'
import * as fs from 'fs'
import { Any, Repository } from 'typeorm'
import { CreateDirectoryDto } from './dto/file.dto'
import { FileEntity, FileTypes } from './entities/file.entity'
import { STATIC_FILE_PATH } from './file.config'

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(FileEntity)
    private readonly fileRepository: Repository<FileEntity>,
  ) {}

  // Create directory in static folder
  async createDirLocally(file: FileEntity) {
    const filePath = `${STATIC_FILE_PATH}/user_${file.user.id}/${file.filePath}`
    if (fs.existsSync(filePath))
      throw new BadRequestException('Директория уже существует')
    fs.mkdirSync(filePath, { recursive: true })
    return
  }

  // Create Directory and save in database
  async createDirectory(userId: number, dto: CreateDirectoryDto) {
    const newDir = await this.fileRepository.create({
      fileName: dto.fileName,
      fileSize: dto.fileSize ? dto.fileSize : 0,
      mimetype: null,
      parent: { id: dto.parentId },
      user: { id: userId },
    })

    const parentFolder =
      dto.parentId !== undefined
        ? await this.fileRepository.findOneBy({ id: dto.parentId })
        : undefined

    if (!parentFolder) newDir.filePath = dto.fileName
    else newDir.filePath = `${parentFolder.filePath}/${newDir.fileName}`

    return await this.fileRepository
      .save(newDir)
      .then(() => this.createDirLocally(newDir))
  }

  // Get files from defined folder
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

  // Get files from root folder by userId
  async getFilesFromRoot(userId: number) {
    const files: string[] = []
    const filePath = `${STATIC_FILE_PATH}/user_${userId}`
    if (!fs.existsSync(filePath))
      throw new BadRequestException('Директории пользователя не существует')
    fs.readdirSync(filePath).forEach(file => files.push(file))
    try {
      return await this.fileRepository.findBy({
        user: { id: userId },
        fileName: Any(files),
      })
    } catch (e) {
      throw new BadRequestException(e.message)
    }
  }

  // Upload file and save in database
  async uploadFile(
    file: Express.Multer.File,
    userId: number,
    dirId: number,
    dir: string,
  ) {
    // create file note in database
    const newFile = await this.fileRepository.create({
      fileName: file.originalname,
      fileSize: file.size,
      user: { id: userId },
      parent: { id: dirId },
      filePath: dir,
      mimetype: file.mimetype,
      fileType: FileTypes.file,
    })

    return await this.fileRepository.save(newFile)
  }

  // Download file
  async downloadFile(response: Response, fileId: number, userId: number) {
    const file = await this.fileRepository.findOne({
      where: { id: fileId, user: { id: userId } },
    })
    if (!file) throw new NotFoundException('Такого файла не существует')

    const pathToFile = `${STATIC_FILE_PATH}/user_${userId}/${file.filePath}`

    response.set({
      'Content-Disposition': `inline; filename="${file.fileName}"`,
      'Content-Type': file.mimetype,
    })
    return response.download(pathToFile)
  }
}
