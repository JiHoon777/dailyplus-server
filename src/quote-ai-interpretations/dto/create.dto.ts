import { IsNumberString, IsOptional, IsString } from 'class-validator'

export class CreateQuoteAiInterpretationDto {
  @IsString()
  content: string

  @IsString()
  @IsOptional()
  prompt?: string | null

  @IsString()
  modelVersion: string

  @IsNumberString()
  quoteId: number

  @IsNumberString()
  userId: number
}
