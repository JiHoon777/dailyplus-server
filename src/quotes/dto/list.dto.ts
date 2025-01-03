import { IsOptional, IsString } from 'class-validator'

import { ListRequestDto } from '@/shared/dto'

export class ListQuoteRequestDto extends ListRequestDto {
  @IsString()
  @IsOptional()
  quotePersonName?: string
}
