import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { ListResponseDto } from '@/shared/dto'
import { BaseEntityService } from '@/shared/entities'

import { ListQuotePersonDto } from './dto/list.dto'
import { QuotePerson } from './quote-person.entity'

@Injectable()
export class QuotePersonsService extends BaseEntityService<QuotePerson> {
  constructor(
    @InjectRepository(QuotePerson)
    repository: Repository<QuotePerson>,
  ) {
    super(repository)
  }

  async list(input: ListQuotePersonDto): Promise<ListResponseDto<QuotePerson>> {
    const { page, size } = input

    const [list, total] = await this.query({
      pageOpt: { page, size },
      order: { createdAt: 'DESC' },
    })

    return ListResponseDto.of(list, total, page, size)
  }
}