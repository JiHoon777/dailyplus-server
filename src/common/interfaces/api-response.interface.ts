export interface ApiResponse<T> {
  success: boolean
  data: T | null
  errorCode: string | null
  errorMessage: string | null
}

export enum ApiErrorCode {
  AUTH_UNAUTHORIZED = 'AUTH.UNAUTHORIZED',
  AUTH_TOKEN_EXPIRED = 'AUTH.TOKEN_EXPIRED',
  AUTH_REFRESH_TOKEN_EXPIRED = 'AUTH.REFRESH_TOKEN_EXPIRED',
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
}
