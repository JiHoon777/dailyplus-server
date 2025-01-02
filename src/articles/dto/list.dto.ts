import { IsEnum, IsOptional } from 'class-validator'

import { ListRequestDto } from '@/common/dto'

import { ArticleType } from '../enums'

export class ListArticleRequestDto extends ListRequestDto {
  @IsEnum(ArticleType)
  @IsOptional()
  type?: ArticleType
}
