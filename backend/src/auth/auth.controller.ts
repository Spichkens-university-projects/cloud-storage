import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, UsePipes, ValidationPipe } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto, RegisterDto } from "./dto/auth.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Post("login")
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post("register")
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Get("refresh")
  @HttpCode(HttpStatus.OK)
  async refresh(@Req() request) {
    return this.authService.refresh(request.cookies["refresh"]);
  }
}
