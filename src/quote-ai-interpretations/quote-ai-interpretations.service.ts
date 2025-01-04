import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { ListResponseDto } from '@/shared/dto'
import { BaseEntityService } from '@/shared/entities'

import { ListQuoteAiInterpretationRequestDto } from './dto'
import { QuoteAiInterpretation } from './quote-ai-interpretation.entity'

@Injectable()
export class QuoteAiInterpretationsService extends BaseEntityService<QuoteAiInterpretation> {
  constructor(
    @InjectRepository(QuoteAiInterpretation)
    repository: Repository<QuoteAiInterpretation>,
  ) {
    super(repository)
  }

  async list(
    input: ListQuoteAiInterpretationRequestDto,
  ): Promise<ListResponseDto<QuoteAiInterpretation>> {
    const { page, size, quoteId } = input

    const [list, total] = await this.query({
      pageOpt: { page, size },
      order: { created_at: 'DESC' },
      decorator: (qb) => {
        if (quoteId) {
          qb.andWhere('e.quote_id = :quoteId', { quoteId })
        }
      },
    })

    return ListResponseDto.of(list, total, page, size)
  }
}
