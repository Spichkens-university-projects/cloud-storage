import { Column, Entity } from "typeorm";
import { BaseEntity } from "../../utils/base.entity";

@Entity('users')
export class UserEntity extends BaseEntity {
  @Column()
  name: string

  @Column()
  surname: string

  @Column()
  email: string

  @Column()
  password: string
}
