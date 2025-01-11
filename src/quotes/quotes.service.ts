import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { In, Repository } from 'typeorm'

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
      order: { 'e.createdAt': 'DESC' },
      decorator: (qb) => {
        qb.leftJoinAndSelect('e.quotePerson', 'quotePerson')

        if (quotePersonName) {
          qb.andWhere('quotePerson.name = :quotePersonName', {
            quotePersonName,
          })
        }
      },
    })

    return ListResponseDto.of(list, total, page, size)
  }

  async findByIds(quoteIds: number[]): Promise<Quote[]> {
    return this.repository.findBy({
      id: In(quoteIds),
    })
  }
}
