import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { IConfiguration } from '@/config'
import { ErrorCode } from '@/shared/consts'
import { ensureIf } from '@/shared/utils'

@Injectable()
export class PerplexityService {
  private readonly apiKey: string
  private readonly baseUrl = 'https://api.perplexity.ai'

  constructor(private configService: ConfigService<IConfiguration>) {
    this.apiKey = this.configService.get('ai', {
      infer: true,
    }).perplexityApiKey
  }

  async generateCompletion(prompt: string) {
    const response = await fetch(`${this.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: 'llama-3.1-sonar-huge-128k-online',
        messages: [{ role: 'user', content: prompt }],
      }),
    })

    ensureIf(response.ok, ErrorCode.AI_HTTP_ERROR)

    const res = (await response.json()).choices?.[0]?.message?.content ?? null

    ensureIf(res, ErrorCode.AI_NO_RESPONSE)

    return res
  }
}
