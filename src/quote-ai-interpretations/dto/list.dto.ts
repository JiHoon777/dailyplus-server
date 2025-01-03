import { IsNumberString, IsOptional } from 'class-validator'

import { ListRequestDto } from '@/shared/dto'

export class ListQuoteAiInterpretationRequestDto extends ListRequestDto {
  @IsNumberString()
  @IsOptional()
  quoteId?: number
}
