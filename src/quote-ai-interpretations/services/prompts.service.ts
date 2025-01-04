import { Injectable } from '@nestjs/common'

import { OpenAiChatModel, OpenAiService } from '@/ai'

import { QUOTE_PROMPTS } from '../prompts'

@Injectable()
export class QuoteAiInterpretationsPromptsService {
  constructor(private readonly openAiService: OpenAiService) {}

  async interpretQuote({
    quote,
    model,
  }: {
    quote: string
    model?: OpenAiChatModel
  }): Promise<string> {
    return await this.openAiService.generateCompletion({
      messages: QUOTE_PROMPTS.INTERPRET_QUOTE(quote),
      model: model ?? 'gpt-4o-mini',
    })
  }
}
