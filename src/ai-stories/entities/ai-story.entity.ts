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

import { User } from '@/users'

@Entity()
export class AiStory {
  @Index()
  @PrimaryGeneratedColumn()
  id: number

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

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
