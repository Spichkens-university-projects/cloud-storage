import { Response } from "express";
import { LoginUserDto } from "../users/dto/login-user.dto";
import { IUser } from './../users/types/user.interface'
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { RegisterUserDto } from '../users/dto/register-user.dto'
import { UserEntity } from '../users/entities/user.entity'
import { AuthResponse } from './types/auth.types'
import { genSalt, compare, hash } from 'bcryptjs'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async singUp(createUserDto: RegisterUserDto): Promise<AuthResponse> {
    const isUserAlreadyExists = await this.userRepository.findOneBy({
      email: createUserDto.email,
    })
    if (isUserAlreadyExists)
      throw new BadRequestException(
        'Пользователь с таким email уже зарегистрирован',
      )

    const salt = await genSalt(5)

    const newUser = await this.userRepository.create({
      email: createUserDto.email,
      name: createUserDto.name,
      surname: createUserDto.surname,
      password: await hash(createUserDto.password, salt),
    })

    const user = await this.userRepository.save(newUser)

    return {
      user: this.returnUserFields(user),
      accessToken: await this.createAccessToken(user.id)
    }
  }

  async signIn(authUserDto: LoginUserDto): Promise<AuthResponse> {
    const user = await this.validateUser(authUserDto)

    return {
      user: this.returnUserFields(user),
      accessToken: await this.createAccessToken(user.id)
    }
  }

  async validateUser(dto: LoginUserDto): Promise<IUser> {
    const user = await this.userRepository.findOne({
      where: {
        email: dto.email,
      },
      select: ['id', 'email', 'password']
    })

    if (!user) throw new NotFoundException('Пользователь не найден')

    const isPasswordValid = await compare(dto.password, user.password)
    if (!isPasswordValid)
      throw new UnauthorizedException('Неверный логин или пароль')

    return user
  }

  returnUserFields(user: UserEntity) {
    return {
      id: user.id,
      email: user.email,
    }
  }

  async createAccessToken(userId: number) {
    const data = { id: userId }

    return await this.jwtService.signAsync(data, {
      secret: this.configService.get<string>('ACCESS_SECRET'),
      expiresIn: '1d',
    })
  }

}
