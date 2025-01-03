import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AiStoriesController } from './ai-stories.controller'
import { AiStoriesService } from './ai-stories.service'
import { AiStory } from './ai-story.entity'

@Module({
  imports: [TypeOrmModule.forFeature([AiStory])],
  providers: [AiStoriesService],
  controllers: [AiStoriesController],
})
export class AiStoriesModule {}
