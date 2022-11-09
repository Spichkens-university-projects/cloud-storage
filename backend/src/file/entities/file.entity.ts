import { Column, Entity, ManyToOne, OneToOne } from 'typeorm'
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

	@OneToOne(() => FileEntity, { nullable: true })
	parent: FileEntity

	@ManyToOne(() => UserEntity, user => user.files)
	user: UserEntity

	@OneToOne(() => FileEntity)
	children: FileEntity[]
}
