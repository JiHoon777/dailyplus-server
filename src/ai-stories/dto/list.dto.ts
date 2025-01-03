import { IsNumber, IsOptional } from 'class-validator'

import { ListRequestDto } from '@/shared/dto'

export class ListAiStoryRequestDto extends ListRequestDto {
  @IsNumber()
  @IsOptional()
  userId?: number
}
