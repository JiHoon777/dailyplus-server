export interface ApiResponse<T> {
  success: boolean
  data: T
  errorCode: string | null
  errorMessage: string | null
}
