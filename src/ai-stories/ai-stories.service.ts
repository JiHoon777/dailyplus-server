import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { ListResponseDto } from '@/shared/dto'
import { BaseEntityService } from '@/shared/entities'

import { AiStory } from './ai-story.entity'
import { ListAiStoryRequestDto } from './dto'

@Injectable()
export class AiStoriesService extends BaseEntityService<AiStory> {
  constructor(
    @InjectRepository(AiStory)
    repository: Repository<AiStory>,
  ) {
    super(repository)
  }

  async list(input: ListAiStoryRequestDto): Promise<ListResponseDto<AiStory>> {
    const { page, size, userId } = input

    const [list, total] = await this.query({
      pageOpt: { page, size },
      order: { publishedAt: 'DESC' },
      decorator: (qb) => {
        if (userId) {
          qb.andWhere('e.user_id = :userId', { userId })
        }
      },
    })

    return ListResponseDto.of(list, total, page, size)
  }
}
