import type {
  IStoryBlock,
  IStoryContent,
  StoryMessages,
  StoryMessageType,
} from './type'

export const validateAiStoryContent = (content: string): [string, string] => {
  try {
    const parsedContent: IStoryContent = JSON.parse(content)

    if (!isValidStoryContent(parsedContent)) {
      throw new Error('Invalid story content structure')
    }

    return [parsedContent.storyTitle, content]
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Content validation failed: ${error.message}`)
    }
    throw new Error('Invalid content')
  }
}

function isValidMessageType(type: any): type is StoryMessageType {
  return ['chat', 'script', 'choice'].includes(type)
}

function isValidStoryMessage(message: any): message is StoryMessages {
  if (!message || typeof message !== 'object') return false

  if (!isValidMessageType(message.type)) return false

  switch (message.type) {
    case 'chat':
      return (
        typeof message.chrName === 'string' &&
        typeof message.message === 'string' &&
        (message.isMainChr === undefined ||
          typeof message.isMainChr === 'boolean')
      )
    case 'script':
      return typeof message.message === 'string'
    case 'choice':
      return (
        Array.isArray(message.choices) &&
        message.choices.every((choice: any) => typeof choice === 'string')
      )
    default:
      return false
  }
}

function isValidStoryBlock(block: any): block is IStoryBlock {
  return (
    block &&
    typeof block === 'object' &&
    typeof block.title === 'string' &&
    Array.isArray(block.messages) &&
    block.messages.every(isValidStoryMessage)
  )
}

function isValidStoryContent(content: any): content is IStoryContent {
  return (
    content &&
    typeof content === 'object' &&
    typeof content.startBlockTitle === 'string' &&
    typeof content.blocksMap === 'object' &&
    Object.values(content.blocksMap).every(isValidStoryBlock)
  )
}
