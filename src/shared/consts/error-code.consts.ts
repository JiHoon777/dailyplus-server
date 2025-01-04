export enum ErrorCode {
  COMMON_NOT_FOUND = 'COMMON.NOT_FOUND',
  COMMON_NO_INPUT = 'COMMON.NO_INPUT',

  AUTH_UNAUTHORIZED = 'AUTH.UNAUTHORIZED',
  AUTH_TOKEN_EXPIRED = 'AUTH.TOKEN_EXPIRED',
  AUTH_REFRESH_TOKEN_EXPIRED = 'AUTH.REFRESH_TOKEN_EXPIRED',

  AI_NO_RESPONSE = 'AI.NO_RESPONSE',
  AI_HTTP_ERROR = 'AI.HTTP_ERROR',

  // 500
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
}

export const ErrorCodeMessage: Record<ErrorCode, string> = {
  [ErrorCode.COMMON_NOT_FOUND]: 'Not Found',
  [ErrorCode.COMMON_NO_INPUT]: 'No Input data',

  [ErrorCode.AUTH_UNAUTHORIZED]: 'Unauthorized',
  [ErrorCode.AUTH_TOKEN_EXPIRED]: 'Token is expired',
  [ErrorCode.AUTH_REFRESH_TOKEN_EXPIRED]: 'Refresh token is expired',

  [ErrorCode.AI_NO_RESPONSE]: 'AI no response',
  [ErrorCode.AI_HTTP_ERROR]: 'AI http error',

  [ErrorCode.INTERNAL_SERVER_ERROR]: 'Internal Server Error',
}
