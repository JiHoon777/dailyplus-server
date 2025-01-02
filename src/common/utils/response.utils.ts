import type { ApiResponse } from '../interfaces/api-response.interface'
import type { ErrorCode } from '../consts/error-code.consts'

export function createSuccessResponse<T>(data: T): ApiResponse<T> {
  return {
    success: true,
    data,
    errorCode: null,
    errorMessage: null,
  }
}

export function createErrorResponse<T = null>(
  errorCode: ErrorCode,
  errorMessage: string,
): ApiResponse<T> {
  return {
    success: false,
    data: null,
    errorCode,
    errorMessage,
  }
}
