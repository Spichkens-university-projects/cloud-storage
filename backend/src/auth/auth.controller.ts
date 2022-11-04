import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  ValidationPipe,
  UsePipes,
  Res
} from "@nestjs/common";
import { LoginUserDto } from "../users/dto/login-user.dto";
import { RegisterUserDto } from "../users/dto/register-user.dto";
import { AuthResponse } from "./types/auth.types";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  @Post("signup")
  async signUp(
    @Body() createUserDto: RegisterUserDto
  ): Promise<AuthResponse> {
    return await this.authService.singUp(createUserDto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  @Post("signin")
  async signIn(
    @Body() authUserDto: LoginUserDto
  ): Promise<AuthResponse> {
    return await this.authService.signIn(authUserDto);
  }
}
