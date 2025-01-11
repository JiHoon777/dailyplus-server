import { Injectable } from '@nestjs/common'

import { OpenAiChatModel, OpenAiService } from '@/ai'
import { Quote } from '@/quotes/quote.entity'

import { validateAiStoryContent } from '../ai-story-content'
import { AI_STORY_PROMPTS } from '../prompts'

@Injectable()
export class AiStoriesPromptsService {
  constructor(private readonly openAiService: OpenAiService) {}

  async generateStory({
    quotes,
    model,
    customPrompt,
  }: {
    quotes: Quote[]
    model?: OpenAiChatModel
    customPrompt?: string
  }): Promise<[string, string]> {
    const content = await this.openAiService.generateCompletion({
      messages: AI_STORY_PROMPTS.GENERATE_STORY(quotes, customPrompt),
      model: model ?? 'gpt-4o-mini',
    })

    return validateAiStoryContent(content)
  }
}
