import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import {ExtractJwt, Strategy} from 'passport-jwt'
import { UserEntity } from "../../users/entities/user.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt'){
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: configService.get<string>('JWT_SECRET')
    });
  }

  async validate({id}: Pick<UserEntity, 'id'>) {
    return await this.userRepository.findOneBy({id})
  }
}