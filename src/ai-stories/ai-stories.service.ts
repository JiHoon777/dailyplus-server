import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { QuotesService } from '@/quotes'
import { ErrorCode } from '@/shared/consts'
import { ListResponseDto } from '@/shared/dto'
import { BaseEntityService } from '@/shared/entities'
import { ensureIf } from '@/shared/utils'

import { AiStory } from './ai-story.entity'
import {
  GenerateAiStoryFromQuotesRequestDto,
  ListAiStoryRequestDto,
} from './dto'
import { AiStoriesPromptsService } from './services'

@Injectable()
export class AiStoriesService extends BaseEntityService<AiStory> {
  constructor(
    @InjectRepository(AiStory)
    repository: Repository<AiStory>,
    private readonly promptsService: AiStoriesPromptsService,
    private readonly quotesService: QuotesService,
  ) {
    super(repository)
  }

  async list(input: ListAiStoryRequestDto): Promise<ListResponseDto<AiStory>> {
    const { page, size, userId } = input

    const [list, total] = await this.query({
      pageOpt: { page, size },
      order: { 'e.createdAt': 'DESC' },
      decorator: (qb) => {
        if (userId) {
          qb.andWhere('e.userId = :userId', { userId })
        }
      },
    })

    return ListResponseDto.of(list, total, page, size)
  }

  async generateFromQuotesAndSave(
    input: GenerateAiStoryFromQuotesRequestDto & { userId: number },
  ) {
    const { quoteIds, customPrompt, userId } = input
    const quotes = await this.quotesService.findByIds(quoteIds)

    ensureIf(quotes.length > 0, ErrorCode.COMMON_NOT_FOUND)

    const [title, content] = await this.promptsService.generateStory({
      quotes,
      model: 'gpt-4o-mini',
      customPrompt,
    })

    return this.create({
      title,
      content,
      modelVersion: 'gpt-4o-mini',
      userId,
    })
  }
}
