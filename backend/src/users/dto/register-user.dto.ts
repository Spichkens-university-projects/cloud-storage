import {  IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class RegisterUserDto {

  @IsEmail({}, {message: 'Формат почты задан неверно'})
  @IsNotEmpty({message: 'Поле "Email" не может быть пустым'})
  email: string

  @MinLength(4, {message: "Минимальная длина пароля - 4 символов"})
  @MaxLength(16, {message: "Максимальная длина пароля - 16 символов"})
  @IsNotEmpty({message: 'Поле "Пароль" не может быть пустым'})
  password: string

  @IsNotEmpty({message: 'Поле "Имя" не может быть пустым'})
  name: string

  @IsNotEmpty({message: 'Поле "Фамилия" не может быть пустым'})
  surname: string
}




