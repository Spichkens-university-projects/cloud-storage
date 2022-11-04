import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserEntity } from "./entities/user.entity";
import { IUser } from "./types/user.interface";

@Injectable()
export class UsersService {
  constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) {}

  async getAllUsers(): Promise<IUser[]> {
    return await this.userRepository.find({});
  }

  async getUserById(id: number): Promise<IUser> {
    const user = await this.userRepository.findOne({
        where: { id }
      }
    );
    if (!user) throw new NotFoundException("Пользователь не найден");
    return user;
  }
}
