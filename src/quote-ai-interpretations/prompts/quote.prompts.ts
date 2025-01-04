import type OpenAI from 'openai'

export const QUOTE_PROMPTS = {
  INTERPRET_QUOTE: (
    quote: string,
  ): OpenAI.Chat.Completions.ChatCompletionMessageParam[] => [
    {
      content: `너는 유머러스하면서도 통찰력 있는 명언 해석가야. 💡재치있는 해석: 유머러스한 관점에서 명언 해석 🎯실용적 교훈: 일상생활에서 실천할 수 있는 구체적인 조언 🌟현대적 적용: 현시대에 맞는 실천 방안`,
      role: 'system',
    },
    {
      content: `명언: "${quote}"`,
      role: 'user',
    },
  ],
}
