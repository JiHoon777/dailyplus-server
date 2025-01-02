import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { ErrorCode } from '@/common/consts'
import { ListResponseDto } from '@/common/dto'
import { ensureIf } from '@/common/utils'

import {
  CreateArticleDto,
  ListArticleRequestDto,
  UpdateArticleDto,
} from './dto'
import { Article } from './entities/article.entity'

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private readonly articlesRepository: Repository<Article>,
  ) {}

  async create(input: CreateArticleDto): Promise<Article> {
    const article = this.articlesRepository.create(input)
    return this.articlesRepository.save(article)
  }

  async findById(id: number): Promise<Article> {
    const article = await this.articlesRepository.findOneBy({ id })

    ensureIf(article, ErrorCode.COMMON_NOT_FOUND)

    return article
  }

  async update(id: number, input: UpdateArticleDto): Promise<Article> {
    const article = await this.findById(id)
    Object.assign(article, input)
    return this.articlesRepository.save(article)
  }

  async remove(id: number): Promise<void> {
    const article = await this.findById(id)

    ensureIf(article, ErrorCode.COMMON_NOT_FOUND)

    await this.articlesRepository.remove(article)
  }

  async list(input: ListArticleRequestDto): Promise<ListResponseDto<Article>> {
    const { page, size, type } = input

    const queryBuilder = this.articlesRepository
      .createQueryBuilder('article')
      .where('article.published_at IS NOT NULL')
      .orderBy(`article.published_at`, 'DESC')
      .skip((page - 1) * size)
      .take(size)

    if (type) {
      queryBuilder.andWhere('article.type = :type', { type })
    }

    const [articles, total] = await queryBuilder.getManyAndCount()

    return ListResponseDto.of(articles, total, page, size)
  }
}
