import { Type } from 'class-transformer'
import { IsDate, IsEnum, IsString, IsUrl } from 'class-validator'

import { ArticleType } from '../enums/article-type.enum'

export class CreateArticleDto {
  @IsString()
  title: string

  @IsString()
  summary: string

  @IsEnum(ArticleType)
  type: ArticleType

  @Type(() => Date)
  @IsDate()
  publishedAt: Date

  @IsUrl()
  referenceUrl: string
}
