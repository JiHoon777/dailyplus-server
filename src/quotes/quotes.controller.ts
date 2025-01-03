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

import { CreateQuoteDto, ListQuoteRequestDto, UpdateQuoteDto } from './dto'
import { QuotesService } from './quotes.service'

@Controller('quotes')
export class QuotesController {
  constructor(private readonly quotesService: QuotesService) {}

  @Post()
  create(@Body() body: CreateQuoteDto) {
    return this.quotesService.create(body)
  }

  @Public()
  @Get('list')
  list(@Query() query: ListQuoteRequestDto) {
    return this.quotesService.list(query)
  }

  @Public()
  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.quotesService.findById(id)
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number, //
    @Body() body: UpdateQuoteDto,
  ) {
    return this.quotesService.update(id, body)
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.quotesService.delete(id)
  }
}
