import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { OpenAiChatModel } from '@/ai'
import { QuotesService } from '@/quotes'
import { ErrorCode } from '@/shared/consts'
import { ListResponseDto } from '@/shared/dto'
import { BaseEntityService } from '@/shared/entities'
import { ensureIf } from '@/shared/utils'

import {
  GenerateQuoteAiInterpretationDto,
  ListQuoteAiInterpretationRequestDto,
} from './dto'
import { QuoteAiInterpretation } from './quote-ai-interpretation.entity'
import { QuoteAiInterpretationsPromptsService } from './services'

@Injectable()
export class QuoteAiInterpretationsService extends BaseEntityService<QuoteAiInterpretation> {
  constructor(
    @InjectRepository(QuoteAiInterpretation)
    repository: Repository<QuoteAiInterpretation>,
    private readonly promptsService: QuoteAiInterpretationsPromptsService,
    private readonly quotesService: QuotesService,
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

  async generateInterpretationAndSave(
    input: GenerateQuoteAiInterpretationDto,
  ): Promise<QuoteAiInterpretation> {
    const { quoteId, userId } = input
    ensureIf(userId, ErrorCode.COMMON_NOT_FOUND)

    const quote = await this.quotesService.findById(quoteId)

    ensureIf(quote, ErrorCode.COMMON_NOT_FOUND)

    const quoteText = `${quote.originalText}, ${quote.koreanText}`

    const modelVersion: OpenAiChatModel = 'gpt-4o-mini'
    const content = await this.promptsService.interpretQuote({
      quote: quoteText,
      model: modelVersion,
    })

    return this.create({
      modelVersion,
      content,
      quoteId,
      userId,
    })
  }
}
