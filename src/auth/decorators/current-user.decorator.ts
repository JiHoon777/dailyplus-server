import type { ExecutionContext } from '@nestjs/common'

import { createParamDecorator } from '@nestjs/common'

const getCurrentUserByContext = (context: ExecutionContext) =>
  context.switchToHttp().getRequest().user

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) =>
    getCurrentUserByContext(context),
)
