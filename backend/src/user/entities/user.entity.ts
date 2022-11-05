import { Column, Entity } from "typeorm";
import { BaseEntity } from "../../utils/base.entity";

@Entity('user')
export class UserEntity extends BaseEntity {
  @Column()
  name: string

  @Column()
  surname: string

  @Column({unique: true})
  email: string

  @Column({select: false})
  password: string
}
