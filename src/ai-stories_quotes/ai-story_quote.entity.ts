import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'

import { AiStory } from '@/ai-stories'
import { Quote } from '@/quotes'
import { BaseEntity } from '@/shared/entities'

@Entity()
export class AiStory_Quote extends BaseEntity {
  @Column('int')
  aiStoryId: number

  @Column('int')
  quoteId: number

  @ManyToOne(() => AiStory, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'ai_story_id' })
  aiStory: AiStory

  @ManyToOne(() => Quote, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'quote_id' })
  quote: Quote
}
