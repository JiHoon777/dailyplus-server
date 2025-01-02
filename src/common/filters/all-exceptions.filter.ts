import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common'
import { Response } from 'express'

import { ApiErrorCode } from '../interfaces/api-response.interface'
import { createErrorResponse } from '../utils/response.util'

// Todo: Refactor
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()

    const errorResponse = createErrorResponse(
      'INTERNAL_SERVER_ERROR' as ApiErrorCode,
      '서버 오류가 발생했습니다.',
    )
    let status = HttpStatus.INTERNAL_SERVER_ERROR

    if (exception instanceof HttpException) {
      status = exception.getStatus()
      const errorResponse = exception.getResponse() as any

      // 인증 관련 예외 처리
      if (exception instanceof UnauthorizedException) {
        if (errorResponse.cause === 'AUTH.TOKEN_EXPIRED') {
          return response
            .status(status)
            .json(
              createErrorResponse(
                ApiErrorCode.AUTH_TOKEN_EXPIRED,
                '토큰이 만료되었습니다.',
              ),
            )
        }
        if (errorResponse.cause === 'AUTH.REFRESH_TOKEN_EXPIRED') {
          return response
            .status(status)
            .json(
              createErrorResponse(
                ApiErrorCode.AUTH_REFRESH_TOKEN_EXPIRED,
                '리프레시 토큰이 만료되었습니다.',
              ),
            )
        }
        return response
          .status(status)
          .json(
            createErrorResponse(
              ApiErrorCode.AUTH_UNAUTHORIZED,
              '인증에 실패했습니다.',
            ),
          )
      }

      // 유효성 검사 예외 처리
      if (exception instanceof BadRequestException) {
        return response
          .status(status)
          .json(
            createErrorResponse(
              ApiErrorCode.INTERNAL_SERVER_ERROR,
              Array.isArray(errorResponse.message)
                ? errorResponse.message[0]
                : errorResponse.message,
            ),
          )
      }

      return response
        .status(status)
        .json(
          createErrorResponse(
            `${exception.name.replace('Exception', '').toUpperCase()}` as ApiErrorCode,
            errorResponse.message || exception.message,
          ),
        )
    }

    response.status(status).json(errorResponse)
  }
}
