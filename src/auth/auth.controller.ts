import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common'
import { Response } from 'express'

import { User } from '@/users/entities/user.entity'

import { Public } from './auth.common'
import { AuthService } from './auth.service'
import { CurrentUser } from './decorators/current-user.decorator'
import { JwtRefreshAuthGuard } from './guards/jwt-refresh-auth.guard'
import { LocalAuthGuard } from './guards/local-auth.guard'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('signup')
  async signup(@Body() input: { email: string; password: string }) {
    return this.authService.signup(input)
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('signin')
  signin(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.signin(user, response)
  }

  @Public()
  @UseGuards(JwtRefreshAuthGuard)
  @Post('refresh-token')
  refreshToken(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.signin(user, response)
  }

  @Post('signout')
  signout(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.signout(user.id, response)
  }

  @Get('profile')
  getProfile(@CurrentUser() user: User) {
    return user
  }
}
