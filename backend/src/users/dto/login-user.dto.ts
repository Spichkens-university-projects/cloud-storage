import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class LoginUserDto {
  @IsEmail({}, {message: 'Формат почты задан неверно'})
  @IsNotEmpty({message: 'Поле "Email" не может быть пустым'})
  email: string

  @IsNotEmpty({message: 'Поле "Пароль" не может быть пустым'})
  password: string
}