import { PartialType } from '@nestjs/mapped-types'

import { CreateAiStoryDto } from './create.dto'

export class UpdateAiStoryDto extends PartialType(CreateAiStoryDto) {}
