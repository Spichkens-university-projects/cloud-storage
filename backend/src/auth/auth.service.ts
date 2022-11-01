import { BadRequestException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { User } from "../users/entities/user.entity";
import { AuthResponse } from "./types/auth.types";
import {genSalt, compare, hash} from 'bcryptjs'

@Injectable()
export class AuthService {
  constructor(@InjectRepository(User)
              private readonly userRepository: Repository<User>,
              private readonly jwtService: JwtService,
              private readonly configService: ConfigService) {}

  async singUp(createUserDto: CreateUserDto): Promise<AuthResponse> {
    const isUserAlreadyExists = await this.userRepository.findOneBy({email: createUserDto.email})
    if (isUserAlreadyExists) throw new BadRequestException('Пользователь с таким email уже зарегистрирован')

    const salt = await genSalt(5)

    const newUser = await this.userRepository.create({
      email: createUserDto.email,
      name: createUserDto.name,
      surname: createUserDto.surname,
      password: await hash(createUserDto.password, salt)
    })

    const user = await this.userRepository.save(newUser)

    return {
      user: this.returnUserFields(user),
      tokens: await this.createTokens(user.id)
    }
  }

  returnUserFields(user: User) {
    return {
      id: user.id,
      email: user.email,
      password: user.password,
      name: user.name,
      surname: user.surname,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    }
  }

  async createTokens(userId: number){

    const data = { id: userId }

    const [access, refresh] = await Promise.all([
      this.jwtService.signAsync(data, {
        secret: this.configService.get<string>('ACCESS_SECRET'),
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(data, {
        secret: this.configService.get<string>('REFRESH_SECRET'),
        expiresIn: '7d',
      })
    ])

    return { access, refresh }

  }
}
