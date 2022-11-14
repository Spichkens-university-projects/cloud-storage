import { Column, Entity, OneToMany } from 'typeorm'
import { FileEntity } from '../../file/entities/file.entity'
import { BaseEntity } from '../../utils/base.entity'

@Entity('user')
export class UserEntity extends BaseEntity {
  @Column()
  name: string

  @Column()
  surname: string

  @Column({ unique: true })
  email: string

  @Column({ select: false })
  password: string

  @OneToMany(() => FileEntity, file => file.user)
  files: File[]
}
