import {
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import { AiStory } from '@/ai-stories'
import { Quote } from '@/quotes'

@Entity()
export class AiStory_Quote {
  @Index()
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => AiStory, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'ai_story_id' })
  aiStory: AiStory

  @ManyToOne(() => Quote, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'quote_id' })
  quote: Quote

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
