import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { ListResponseDto } from '@/shared/dto'
import { BaseEntityService } from '@/shared/entities'

import { ListQuoteRequestDto } from './dto'
import { Quote } from './quote.entity'

@Injectable()
export class QuotesService extends BaseEntityService<Quote> {
  constructor(
    @InjectRepository(Quote)
    repository: Repository<Quote>,
  ) {
    super(repository)
  }

  async list(input: ListQuoteRequestDto): Promise<ListResponseDto<Quote>> {
    const { page, size, quotePersonName } = input

    const [list, total] = await this.query({
      pageOpt: { page, size },
      order: { created_at: 'DESC' },
      decorator: (qb) => {
        if (quotePersonName) {
          qb.andWhere('e.name = :quotePersonName', {
            quotePersonName,
          })
        }
      },
    })

    return ListResponseDto.of(list, total, page, size)
  }
}
