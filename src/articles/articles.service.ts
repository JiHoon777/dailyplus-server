import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { ListResponseDto } from '@/shared/dto'
import { BaseEntityService } from '@/shared/entities'

import { Article } from './article.entity'
import { ListArticleRequestDto } from './dto'

@Injectable()
export class ArticlesService extends BaseEntityService<Article> {
  constructor(
    @InjectRepository(Article)
    repository: Repository<Article>,
  ) {
    super(repository)
  }

  async list(input: ListArticleRequestDto): Promise<ListResponseDto<Article>> {
    const { page, size, type } = input

    const [list, total] = await this.query({
      pageOpt: { page, size },
      order: { 'e.publishedAt': 'DESC' },
      decorator: (qb) => {
        qb.where('e.publishedAt IS NOT NULL')

        if (type) {
          qb.andWhere('e.type = :type', { type })
        }
      },
    })

    return ListResponseDto.of(list, total, page, size)
  }
}
