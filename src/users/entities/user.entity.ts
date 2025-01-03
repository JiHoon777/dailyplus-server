import { Column, Entity } from 'typeorm'

import { BaseEntity } from '@/shared/entities'

import { UserRole } from '../enums/users-role.enum'

@Entity()
export class User extends BaseEntity {
  @Column({
    type: 'varchar',
    length: 255,
    unique: true,
  })
  email: string

  @Column('text')
  password: string

  @Column({ type: 'text', nullable: true })
  name: string | null

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole

  @Column({ type: 'text', nullable: true })
  refreshToken: string | null
}
