import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Post,
} from '@nestjs/common'
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

	@Get()
	@OnlyAuthed()
	@HttpCode(HttpStatus.OK)
	async getFiles(
		@CurrentUser('id') id: number,
		@Param('fileName') filePath: string,
	) {
		return this.fileService.getFiles(id, filePath)
	}
}
