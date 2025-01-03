import { PartialType } from '@nestjs/mapped-types'

import { CreateQuoteAiInterpretationDto } from './create.dto'

export class UpdateQuoteAiInterpretationDto extends PartialType(
  CreateQuoteAiInterpretationDto,
) {}
