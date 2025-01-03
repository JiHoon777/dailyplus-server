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

import { ArticlesService } from './articles.service'
import {
  CreateArticleDto,
  ListArticleRequestDto,
  UpdateArticleDto,
} from './dto'

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  create(@Body() body: CreateArticleDto) {
    return this.articlesService.create(body)
  }

  @Public()
  @Get('list')
  list(@Query() query: ListArticleRequestDto) {
    return this.articlesService.list(query)
  }

  @Public()
  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.articlesService.findById(id)
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateArticleDto,
  ) {
    return this.articlesService.update(id, body)
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.articlesService.delete(id)
  }
}
