import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AiStories_QuotesService } from './ai-stories_quotes.service'
import { AiStory_Quote } from './ai-story_quote.entity'

@Module({
  imports: [TypeOrmModule.forFeature([AiStory_Quote])],
  providers: [AiStories_QuotesService],
  exports: [AiStories_QuotesService],
})
export class AiStories_QuotesModule {}
