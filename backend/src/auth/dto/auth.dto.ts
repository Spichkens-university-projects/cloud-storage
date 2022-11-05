import {IsEmail, IsNotEmpty, MinLength} from "class-validator";

export class LoginDto {
  @IsEmail()
  email: string

  @MinLength(4)
  password: string
}

export class RegisterDto extends LoginDto {
  @IsNotEmpty()
  name: string

  @IsNotEmpty()
  surname: string
}