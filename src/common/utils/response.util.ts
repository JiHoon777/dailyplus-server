import type {
  ApiErrorCode,
  ApiResponse,
} from '../interfaces/api-response.interface'

export function createSuccessResponse<T>(data: T): ApiResponse<T> {
  return {
    success: true,
    data,
    errorCode: null,
    errorMessage: null,
  }
}

export function createErrorResponse<T = null>(
  errorCode: ApiErrorCode,
  errorMessage: string,
): ApiResponse<T> {
  return {
    success: false,
    data: null,
    errorCode,
    errorMessage,
  }
}
