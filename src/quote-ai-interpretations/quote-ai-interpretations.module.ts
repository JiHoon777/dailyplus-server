import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AiModule } from '@/ai'
import { QuotesModule } from '@/quotes'

import { QuoteAiInterpretation } from './quote-ai-interpretation.entity'
import { QuoteAiInterpretationsController } from './quote-ai-interpretations.controller'
import { QuoteAiInterpretationsService } from './quote-ai-interpretations.service'
import { QuoteAiInterpretationsPromptsService } from './services'

@Module({
  imports: [
    TypeOrmModule.forFeature([QuoteAiInterpretation]),
    AiModule,
    QuotesModule,
  ],
  providers: [
    QuoteAiInterpretationsService,
    QuoteAiInterpretationsPromptsService,
  ],
  controllers: [QuoteAiInterpretationsController],
})
export class QuoteAiInterpretationsModule {}
