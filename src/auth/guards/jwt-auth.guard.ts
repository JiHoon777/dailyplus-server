import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AuthGuard } from '@nestjs/passport'

import { IS_PUBLIC_KEY } from '../auth.common'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super()
  }

  // Todo: get user and check role
  // return (user?.role ?? 0) >= Number(requiredRole)
  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ])
    // const requiredRole =
    //   this.reflector.getAllAndOverride<Role>(ROLE_KEY, [
    //     context.getHandler(),
    //     context.getClass(),
    //   ]) ?? Role.USER

    if (isPublic) {
      // 💡 See this condition
      return true
    }
    return super.canActivate(context)
  }

  handleRequest(err, user, _info) {
    // You can throw an exception based on either "info" or "err" arguments
    if (err || !user) {
      throw err || new UnauthorizedException()
    }

    return user
  }
}
