import { Controller, Get, Param } from '@nestjs/common'
import { OnlyAuthed } from '../auth/decorators/auth.decorator'
import { IUser } from './types/user.interface'
import { CurrentUser } from './user.decorator'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Get()
  async getAllUsers(): Promise<IUser[]> {
    return await this.usersService.getAll()
  }

  @Get('profile')
  @OnlyAuthed()
  async getCurrentUser(@CurrentUser('id') id: number): Promise<IUser> {
    return await this.usersService.getById(id)
  }

  @Get(':id')
  async getUserById(@Param('id') id: number): Promise<IUser> {
    return await this.usersService.getById(id)
  }
}
