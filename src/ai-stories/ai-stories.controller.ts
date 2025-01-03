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

import { AiStoriesService } from './ai-stories.service'
import {
  CreateAiStoryDto,
  ListAiStoryRequestDto,
  UpdateAiStoryDto,
} from './dto'

@Controller('ai-stories')
export class AiStoriesController {
  constructor(private readonly aiStoriesService: AiStoriesService) {}

  @Post()
  create(@Body() body: CreateAiStoryDto) {
    return this.aiStoriesService.create(body)
  }

  @Public()
  @Get('list')
  list(@Query() query: ListAiStoryRequestDto) {
    return this.aiStoriesService.list(query)
  }

  @Public()
  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.aiStoriesService.findById(id)
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateAiStoryDto,
  ) {
    return this.aiStoriesService.update(id, body)
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.aiStoriesService.delete(id)
  }
}
