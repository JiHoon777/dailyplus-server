import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AiModule } from '@/ai'
import { AiStories_QuotesModule } from '@/ai-stories_quotes'
import { QuotesModule } from '@/quotes'

import { AiStoriesController } from './ai-stories.controller'
import { AiStoriesService } from './ai-stories.service'
import { AiStory } from './ai-story.entity'
import { AiStoriesPromptsService } from './services'

@Module({
  imports: [
    TypeOrmModule.forFeature([AiStory]),
    AiModule,
    QuotesModule,
    AiStories_QuotesModule,
  ],
  providers: [AiStoriesService, AiStoriesPromptsService],
  controllers: [AiStoriesController],
})
export class AiStoriesModule {}
