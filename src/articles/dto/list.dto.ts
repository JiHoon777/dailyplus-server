import { IsEnum, IsOptional } from 'class-validator'

import { ListRequestDto } from '@/shared/dto'

import { ArticleType } from '../enums'

export class ListArticleRequestDto extends ListRequestDto {
  @IsEnum(ArticleType)
  @IsOptional()
  type?: ArticleType
}
