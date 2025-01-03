export interface ApiResponse<T> {
  success: boolean
  data: T | null
  errorCode: string | null
  errorMessage: string | null
}
