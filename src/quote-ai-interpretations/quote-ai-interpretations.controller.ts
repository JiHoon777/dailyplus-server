import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common'

import { Public } from '@/auth/auth.common'

import {
  CreateQuoteAiInterpretationDto,
  ListQuoteAiInterpretationRequestDto,
  UpdateQuoteAiInterpretationDto,
} from './dto'
import { QuoteAiInterpretationsService } from './quote-ai-interpretations.service'

@Controller('quote-ai-interpretations')
export class QuoteAiInterpretationsController {
  constructor(
    private readonly quoteAiInterpretationsService: QuoteAiInterpretationsService,
  ) {}

  @Post()
  create(@Body() body: CreateQuoteAiInterpretationDto) {
    return this.quoteAiInterpretationsService.create(body)
  }

  @Public()
  @Get('list')
  list(@Query() query: ListQuoteAiInterpretationRequestDto) {
    return this.quoteAiInterpretationsService.list(query)
  }

  @Public()
  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.quoteAiInterpretationsService.findById(id)
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateQuoteAiInterpretationDto,
  ) {
    return this.quoteAiInterpretationsService.update(id, body)
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.quoteAiInterpretationsService.delete(id)
  }
}
