import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { BaseEntityService } from '@/shared/entities'

import { AiStory_Quote } from './ai-story_quote.entity'

@Injectable()
export class AiStories_QuotesService extends BaseEntityService<AiStory_Quote> {
  constructor(
    @InjectRepository(AiStory_Quote)
    repository: Repository<AiStory_Quote>,
  ) {
    super(repository)
  }
}
