import { IsOptional, IsString } from 'class-validator'

export class CreateQuotePersonDto {
  @IsString()
  name: string

  @IsString()
  @IsOptional()
  description?: string | null
}
