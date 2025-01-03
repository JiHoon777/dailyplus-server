import { Column, Entity, Index } from 'typeorm'

import { BaseEntity } from '@/shared/entities'

@Entity()
export class QuotePerson extends BaseEntity {
  @Index()
  @Column({ type: 'varchar', length: 255, unique: true })
  name: string

  @Column({ type: 'text', nullable: true })
  description: string | null
}
