import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import { Quote } from '@/quotes'
import { User } from '@/users'

@Entity()
export class QuoteAiInterpretation {
  @Index()
  @PrimaryGeneratedColumn()
  id: number

  @Column('text')
  modelVersion: string

  @Column('text')
  content: string

  @Column({ type: 'text', nullable: true })
  prompt: string

  @ManyToOne(() => Quote, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'quote_id' })
  quote: Quote | null

  @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'user_id' })
  user: User | null

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
