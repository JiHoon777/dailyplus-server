import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { QuoteAiInterpretation } from './quote-ai-interpretation.entity'
import { QuoteAiInterpretationsController } from './quote-ai-interpretations.controller'
import { QuoteAiInterpretationsService } from './quote-ai-interpretations.service'

@Module({
  imports: [TypeOrmModule.forFeature([QuoteAiInterpretation])],
  providers: [QuoteAiInterpretationsService],
  controllers: [QuoteAiInterpretationsController],
})
export class QuoteAiInterpretationsModule {}
