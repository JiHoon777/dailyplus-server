import { PartialType } from '@nestjs/mapped-types'

import { CreateQuotePersonDto } from './create.dto'

export class UpdateQuotePersonDto extends PartialType(CreateQuotePersonDto) {}
