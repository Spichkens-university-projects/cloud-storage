import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { compare, genSalt, hash } from "bcryptjs";
import { Repository } from "typeorm";
import { UserEntity } from "../user/entities/user.entity";
import { LoginDto, RegisterDto } from "./dto/auth.dto";
import { IAuthResponse } from "./types/auth.types";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {
  }

  async refresh(rt: string): Promise<IAuthResponse> {
    if (!rt) throw new UnauthorizedException("Пользователь не авторизирован");

    const user = await this.jwtService.verifyAsync(rt, { secret: this.configService.get("REFRESH_SECRET") });

    const [accessToken, refreshToken] = await this.createTokens(user.id);

    return {
      user: this.returnUserFields(user),
      accessToken,
      refreshToken
    };
  }

  async login(dto: LoginDto): Promise<IAuthResponse> {
    const user = await this.validateUser(dto);

    const [accessToken, refreshToken] = await this.createTokens(user.id);

    return {
      user: this.returnUserFields(user),
      accessToken,
      refreshToken
    };
  }

  async register(dto: RegisterDto) {
    const isExist = await this.userRepository.findOneBy({
      email: dto.email
    });
    if (isExist)
      throw new BadRequestException("Пользователь с таким email уже существует");

    const salt = await genSalt(5);

    const newUser = await this.userRepository.create({
      email: dto.email,
      password: await hash(dto.password, salt),
      name: dto.name,
      surname: dto.surname
    });

    const user = await this.userRepository.save(newUser);


    return {
      user: this.returnUserFields(user)
    };
  }

  async validateUser(dto: LoginDto) {
    const user = await this.userRepository.findOne({
      where: {
        email: dto.email
      },
      select: ["id", "email", "password"]
    });

    if (!user)
      throw new NotFoundException("Пользователь с таким email не найден");

    const isValidPassword = await compare(dto.password, user.password);
    if (!isValidPassword)
      throw new UnauthorizedException("Неверный логин или пароль");

    return user;
  }

  async createTokens(userId: number) {
    const data = {
      id: userId
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(data, {
        secret: this.configService.get<string>("ACCESS_SECRET"),
        expiresIn: "15m"
      }),
      this.jwtService.signAsync(data, {
        secret: this.configService.get<string>("REFRESH_SECRET"),
        expiresIn: "7d"
      })
    ]);

    return [accessToken, refreshToken];
  }


  returnUserFields(user: UserEntity) {
    return {
      id: user.id,
      email: user.email
    };
  }
}

