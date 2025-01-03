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

import { Public } from '@/auth'

import {
  CreateQuotePersonDto,
  ListQuotePersonRequestDto,
  UpdateQuotePersonDto,
} from './dto'
import { QuotePersonsService } from './quote-persons.service'

@Controller('quote-persons')
export class QuotePersonsController {
  constructor(private readonly quotePersonsService: QuotePersonsService) {}

  @Post()
  create(@Body() body: CreateQuotePersonDto) {
    return this.quotePersonsService.create(body)
  }

  @Public()
  @Get()
  list(@Query() query: ListQuotePersonRequestDto) {
    return this.quotePersonsService.list(query)
  }

  @Public()
  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.quotePersonsService.findById(id)
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number, //
    @Body() body: UpdateQuotePersonDto,
  ) {
    return this.quotePersonsService.update(id, body)
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.quotePersonsService.delete(id)
  }
}
