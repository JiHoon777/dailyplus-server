import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { Request, Response } from 'express'

import { IJwtPayload } from '../auth.common'
import { AuthService } from '../auth.service'

@Injectable()
@Catch(UnauthorizedException)
export class AuthExceptionsFilter implements ExceptionFilter {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  catch(exception: UnauthorizedException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()
    const status = exception.getStatus()

    const token = request.cookies?.Authentication

    if (token) {
      try {
        const payload = this.jwtService.verify<IJwtPayload>(token, {
          secret: this.configService.get('JWT_SECRET_KEY'),
        })

        if (payload.userId) {
          this.authService.signout(payload.userId, response)
        }
      } catch {
        // 토큰 검증 에러는 무시
      }
    }

    response.status(status).json({
      statusCode: status,
      message: '인증에 실패했습니다.',
      error: 'Unauthorized',
    })
  }
}
