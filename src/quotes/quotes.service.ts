import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { ListResponseDto } from '@/shared/dto'
import { BaseEntityService } from '@/shared/entities'

import { ListQuoteRequestDto } from './dto'
import { Quote } from './quote.entity'

export class QuotesService extends BaseEntityService<Quote> {
  constructor(
    @InjectRepository(Quote)
    quotesRepository: Repository<Quote>,
  ) {
    super(quotesRepository)
  }

  async list(input: ListQuoteRequestDto): Promise<ListResponseDto<Quote>> {
    const { page, size, quotePersonName } = input

    const [quotes, total] = await this.query({
      pageOpt: { page, size },
      order: { createdAt: 'DESC' },
      decorator: (qb) => {
        if (quotePersonName) {
          qb.andWhere('quote_person.name = :quotePersonName', {
            quotePersonName,
          })
        }
      },
    })

    return ListResponseDto.of(quotes, total, page, size)
  }
}
