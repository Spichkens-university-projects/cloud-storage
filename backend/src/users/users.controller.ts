import { Controller, Get } from '@nestjs/common';
import { IUser } from "./types/user.interface";
import { UsersService } from './users.service';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAllUsers(): Promise<IUser[]> {
    return await this.usersService.getAllUsers()
  }
}
