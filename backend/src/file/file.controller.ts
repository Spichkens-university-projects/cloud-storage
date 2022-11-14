import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Param,
  Post,
  Query,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiConsumes, ApiTags } from '@nestjs/swagger'
import e, { Response } from 'express'
import { diskStorage } from 'multer'
import { OnlyAuthed } from '../auth/decorators/auth.decorator'
import { CurrentUser } from '../user/user.decorator'
import { CreateDirectoryDto } from './dto/file.dto'
import { STATIC_FILE_PATH } from './file.config'
import { FileService } from './file.service'

@Controller('file')
@ApiTags('file')
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

  @Post('/upload')
  @OnlyAuthed()
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: function (
          req: e.Request,
          file: Express.Multer.File,
          callback: (error: Error | null, filename: string) => void,
        ) {
          callback(
            null,
            `${STATIC_FILE_PATH}/user_${req.query['userId']}/${req.query['dir']}`,
          )
        },
        filename(
          req: e.Request,
          file: Express.Multer.File,
          callback: (error: Error | null, filename: string) => void,
        ) {
          callback(null, file.originalname)
        },
      }),
    }),
  )
  @ApiConsumes('multipart/form-data')
  uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @CurrentUser('id') id: number,
    @Query('dirId') dirId: number,
    @Query('dir') dir: string,
  ) {
    Logger.log(file)
    return this.fileService.uploadFile(file, id, dirId, dir)
  }

  @Get('download/:fileId')
  @OnlyAuthed()
  @HttpCode(HttpStatus.OK)
  downloadFile(
    @Res({ passthrough: true }) response: Response,
    @Param('fileId') fileId: number,
    @CurrentUser('id') id: number,
  ) {
    return this.fileService.downloadFile(response, fileId, id)
  }
}
