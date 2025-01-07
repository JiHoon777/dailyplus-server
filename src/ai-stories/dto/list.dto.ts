import { Type } from 'class-transformer'
import { IsNumber, IsOptional } from 'class-validator'

import { ListRequestDto } from '@/shared/dto'

export class ListAiStoryRequestDto extends ListRequestDto {
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  userId?: number
}
