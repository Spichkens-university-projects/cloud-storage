import {BadRequestException, Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {compare, hash, genSalt} from "bcryptjs"
import { UserEntity } from "../user/entities/user.entity";
import { LoginDto, RegisterDto } from "./dto/auth.dto";

@Injectable()
export class AuthService {
  constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>, private readonly jwtService: JwtService) {}

  async login(dto: LoginDto) {
    const user = await this.validateUser(dto)

    return {
      user: this.returnUserFields(user),
      accessToken: await this.createAccesToken(user.id)
    }
  }

  async register(dto: RegisterDto) {
    const isExist = await this.userRepository.findOneBy({email: dto.email})
    if(isExist) throw new BadRequestException('Пользователь с таким email уже существует')

    const salt = await genSalt(5)

    const newUser = await this.userRepository.create({
      email: dto.email,
      password: await hash(dto.password, salt),
      name: dto.name,
      surname: dto.surname
    })

    const user = await this.userRepository.save(newUser)

    return {
      user: this.returnUserFields(user),
      accessToken: await this.createAccesToken(user.id)
    }
  }

  async validateUser(dto: LoginDto) {
    const user = await this.userRepository.findOne({
      where: {
        email: dto.email
      },
      select: ['id', "email", "password"]
    })

    if(!user) throw new NotFoundException('Пользователь с таким email не найден')

    const isValidPassword = await compare(dto.password, user.password)
    if(!isValidPassword) throw new UnauthorizedException('Неверный логин или пароль')

    return user
  }

  async createAccesToken(userId: number) {
    const data = {
      id: userId
    }

    return await this.jwtService.signAsync(data, {
      expiresIn: '31d'
    })
  }

  returnUserFields(user: UserEntity) {
    return {
      id: user.id,
      email: user.email
    }
  }

}
