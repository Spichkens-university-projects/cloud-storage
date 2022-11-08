import { Column, Entity, ManyToOne } from 'typeorm'
import { UserEntity } from '../../user/entities/user.entity'
import { BaseEntity } from '../../utils/base.entity'

@Entity('file')
export class FileEntity extends BaseEntity {
	@Column({ name: 'file_name', nullable: false })
	fileName: string

	@Column({ name: 'file_path', nullable: false })
	filePath: string

	@Column({ name: 'file_size' })
	fileSize: number

	@Column({ name: 'parent_id' })
	parentId: number

	@ManyToOne(() => UserEntity, user => user.files, { cascade: true })
	user: UserEntity
}
