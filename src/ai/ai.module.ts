import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { OpenAiService } from './services/openai.service'
import { PerplexityService } from './services/perplexity.service'

@Module({
  imports: [ConfigModule],
  providers: [OpenAiService, PerplexityService],
  exports: [OpenAiService, PerplexityService],
})
export class AiModule {}
