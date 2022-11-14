import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { UserEntity } from '../../user/entities/user.entity'
import { BaseEntity } from '../../utils/base.entity'

export enum FileTypes {
  dir = 'dir',
  file = 'file',
}

@Entity('file')
export class FileEntity extends BaseEntity {
  @Column({ name: 'file_name', nullable: false })
  fileName: string

  @Column({ name: 'file_path', default: '' })
  filePath: string

  @Column({ name: 'file_size', default: 0 })
  fileSize: number

  @Column({ name: 'file_type', default: FileTypes.dir })
  fileType: string

  @Column({ nullable: true })
  mimetype: string

  @ManyToOne(() => FileEntity, { nullable: true })
  @JoinColumn({ name: 'parent_id' })
  parent?: FileEntity

  @ManyToOne(() => UserEntity, user => user.files)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity
}
