import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import OpenAI from 'openai'
import { ChatModel } from 'openai/resources'

import { IConfiguration } from '@/config'
import { ErrorCode } from '@/shared/consts'
import { ensureIf } from '@/shared/utils'

export type OpenAiChatModel = OpenAI.Chat.ChatModel & ChatModel

@Injectable()
export class OpenAiService {
  private readonly openai: OpenAI

  constructor(private configService: ConfigService<IConfiguration>) {
    this.openai = new OpenAI({
      apiKey: this.configService.get('ai', { infer: true }).openaiApiKey,
    })
  }

  async generateCompletion({
    model = 'gpt-4o-mini',
    messages,
  }: {
    model: OpenAiChatModel
    messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[]
  }) {
    const completion = await this.openai.chat.completions.create({
      messages,
      model,
    })

    const res = completion.choices?.[0]?.message?.content ?? null

    ensureIf(res, ErrorCode.AI_NO_RESPONSE)

    return res
  }
}
