import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'

import { Quote } from '@/quotes'
import { BaseEntity } from '@/shared/entities'
import { User } from '@/users'

@Entity()
export class QuoteAiInterpretation extends BaseEntity {
  @Column('text')
  modelVersion: string

  @Column('text')
  content: string

  @Column({ type: 'text', nullable: true })
  prompt: string | null

  @ManyToOne(() => Quote, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'quote_id' })
  quote: Quote | null

  @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'user_id' })
  user: User | null
}
