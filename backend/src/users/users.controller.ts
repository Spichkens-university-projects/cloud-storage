import { Controller, Get, Logger, Param } from "@nestjs/common";
import { Auth } from "../auth/decorators/auth.decorator";
import { IUser } from "./types/user.interface";
import { CurrentUser } from "./user.decorator";
import { UsersService } from "./users.service";


@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }

  @Get('all')
  async getAllUsers(): Promise<IUser[]> {
    return await this.usersService.getAllUsers();
  }

  @Get("current")
  //@Auth() TODO: Почему-то не работает!!!
  async getCurrentUser(@CurrentUser("id") id: number): Promise<IUser> | null {
    Logger.log(id)
    return null
  }

  @Get(":id")
  async getUserById(@Param("id") id: number): Promise<IUser> {
    return await this.usersService.getUserById(id);
  }
}
