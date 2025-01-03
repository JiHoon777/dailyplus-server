import { IsNumber, IsString } from 'class-validator'

export class CreateQuoteDto {
  @IsString()
  originalText: string

  @IsString()
  koreanText: string

  @IsNumber()
  quotePersonId: number
}
