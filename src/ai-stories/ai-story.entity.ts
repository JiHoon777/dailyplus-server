import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'

import { BaseEntity } from '@/shared/entities'
import { User } from '@/users'

@Entity()
export class AiStory extends BaseEntity {
  @Column('text')
  title: string

  @Column('json')
  content: string

  @Column('text')
  modelVersion: string

  @Column({ type: 'text', nullable: true })
  prompt: string | null

  @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'user_id' })
  user: User | null
}
