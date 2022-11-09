import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { OnlyAuthed } from '../auth/decorators/auth.decorator'
import { CurrentUser } from '../user/user.decorator'
import { CreateDirectoryDto } from './dto/file.dto'
import { FileService } from './file.service'

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('create')
  @OnlyAuthed()
  @HttpCode(HttpStatus.OK)
  async createDirectory(
    @CurrentUser('id') id: number,
    @Body() dto: CreateDirectoryDto,
  ) {
    return this.fileService.createDirectory(id, dto)
  }

  @Get('root/:parentId')
  @OnlyAuthed()
  @HttpCode(HttpStatus.OK)
  async getFiles(
    @CurrentUser('id') id: number,
    @Param('parentId') parentId: number,
  ) {
    return this.fileService.getFiles(id, parentId)
  }

  @Get()
  @OnlyAuthed()
  @HttpCode(HttpStatus.OK)
  async getFilesFromRoot(@CurrentUser('id') id: number) {
    return this.fileService.getFilesFromRoot(id)
  }

  @Post('upload')
  @OnlyAuthed()
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.fileService.uploadFile(file)
  }
}
