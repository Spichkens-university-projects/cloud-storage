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
import { CreateUserDto } from '../users/dto/create-user.dto'
import { User } from '../users/entities/user.entity'
import { AuthResponse, AuthUserDto } from './types/auth.types'
import { genSalt, compare, hash } from 'bcryptjs'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async singUp(createUserDto: CreateUserDto): Promise<AuthResponse> {
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
      accessToken: await this.createAccessToken(user.id),
    }
  }

  async signIn(authUserDto: AuthUserDto): Promise<AuthResponse> {
    const user = await this.validateUser(authUserDto)

    return {
      user: this.returnUserFields(user),
      accessToken: await this.createAccessToken(user.id),
    }
  }

  async validateUser(dto: AuthUserDto): Promise<IUser> {
    const user = await this.userRepository.findOne({
      where: {
        email: dto.email,
      },
    })

    if (!user) throw new NotFoundException('Пользователь не найден')

    const isPasswordValid = await compare(dto.password, user.password)
    if (!isPasswordValid)
      throw new UnauthorizedException('Неверный логин или пароль')

    return user
  }

  returnUserFields(user: User) {
    return {
      id: user.id,
      email: user.email,
      password: user.password,
      name: user.name,
      surname: user.surname,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }
  }

  async createAccessToken(userId: number) {
    const data = { id: userId }

    const accessToken = await this.jwtService.signAsync(data, {
      secret: this.configService.get<string>('ACCESS_SECRET'),
      expiresIn: '1d',
    })

    return accessToken
  }
}
