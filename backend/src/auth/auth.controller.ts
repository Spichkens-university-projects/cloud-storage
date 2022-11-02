import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  ValidationPipe,
  UsePipes,
  Res,
} from '@nestjs/common'
import { CreateUserDto } from '../users/dto/create-user.dto'
import { AuthResponse, AuthUserDto } from './types/auth.types'
import { AuthService } from './auth.service'
import { Response } from 'express'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe())
  @Post('signup')
  async signUp(
    @Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<AuthResponse> {
    const res = await this.authService.singUp(createUserDto)
    response.cookie('token', res.accessToken, {
      expires: new Date(Date.now() + 86400e3),
    })
    return res
  }

  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe())
  @Post('signin')
  async signIn(
    @Body() authUserDto: AuthUserDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<AuthResponse> {
    const res = await this.authService.signIn(authUserDto)
    response.cookie('token', res.accessToken, {
      expires: new Date(Date.now() + 86400e3),
    })
    return res
  }
}
