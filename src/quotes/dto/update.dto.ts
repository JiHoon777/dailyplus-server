import { PartialType } from '@nestjs/mapped-types'

import { CreateQuoteDto } from './create.dto'

export class UpdateQuoteDto extends PartialType(CreateQuoteDto) {}
