import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string

  @MinLength(4, {message: "Минимальная длина пароля - 4 символов"})
  @MaxLength(16, {message: "Максимальная длина пароля - 16 символов"})
  @IsNotEmpty()
  password: string

  @IsNotEmpty()
  name: string

  @IsNotEmpty()
  surname: string
}
