import { Controller, Post, Body, HttpCode, HttpStatus, ValidationPipe, UsePipes, Res, Req } from "@nestjs/common";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { AuthResponse } from "./types/auth.types";
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe())
  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto, @Res({passthrough: true}) response: Response ): Promise<AuthResponse> {
    const res = await this.authService.singUp(createUserDto);
    response.cookie('refresh', res.tokens.refresh)
    return res
  }
}
