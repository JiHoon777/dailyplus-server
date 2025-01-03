import { IsJSON, IsNumber, IsOptional, IsString } from 'class-validator'

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
