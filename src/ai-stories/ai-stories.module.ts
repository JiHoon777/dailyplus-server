import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AiModule } from '@/ai'
import { QuotesModule } from '@/quotes'

import { AiStoriesController } from './ai-stories.controller'
import { AiStoriesService } from './ai-stories.service'
import { AiStory } from './ai-story.entity'
import { AiStoriesPromptsService } from './services'

@Module({
  imports: [TypeOrmModule.forFeature([AiStory]), AiModule, QuotesModule],
  providers: [AiStoriesService, AiStoriesPromptsService],
  controllers: [AiStoriesController],
})
export class AiStoriesModule {}
