import {
  IsArray,
  IsJSON,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class CreateAiStoryDto {
  @IsString()
  title: string

  @IsJSON()
  content: string

  @IsString()
  modelVersion: string

  @IsString()
  @IsOptional()
  prompt?: string

  @IsNumber()
  userId: number
}

export class GenerateAiStoryFromQuotesRequestDto {
  @IsNumber()
  @IsArray()
  quoteIds: number[]

  @IsString()
  @IsOptional()
  customPrompt?: string
}
