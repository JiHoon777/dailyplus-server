import type { Quote } from '@/quotes'
import type OpenAI from 'openai'

export const AI_STORY_PROMPTS = {
  GENERATE_STORY: (
    quotes: Quote[],
    customPrompt?: string,
  ): OpenAI.Chat.Completions.ChatCompletionMessageParam[] => [
    {
      content: `
주어진 명언들을 바탕으로 다음의 타입을 만족하는 이야기를 생성해줘.
type BlockTitle = string
export type IStoryContent = {
  storyTitle: string
  startBlockTitle: BlockTitle
  blocksMap: Record<BlockTitle, IStoryBlock>
}

export type IStoryBlock = {
  title: BlockTitle
  messages: StoryMessages[]
}

export type StoryMessageType = 'chat' | 'script' | 'choice'

export type IStoryMessageChat = {
  type: 'chat'
  chrName: string
  // 이야기의 중심이 되는 캐릭터
  isMainChr?: boolean
  message: string
}

// 지문
export type IStoryMessageScript = {
  type: 'script'
  message: string
}

// 선택지
export type IStoryMessageChoice = {
  type: 'choice'
  choices: BlockTitle[]
}

export type StoryMessages =
  | IStoryMessageChat
  | IStoryMessageScript
  | IStoryMessageChoice
`,
      role: 'system',
    },
    {
      content: `명언들: ${quotes.map((quote) => quote.originalText).join(',')}`,
      role: 'user',
    },
    {
      content: customPrompt ?? '',
      role: 'user',
    },
  ],
}
