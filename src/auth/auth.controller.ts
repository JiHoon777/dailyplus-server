import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common'

import { Public } from './auth.common'
import { AuthService } from './auth.service'
import { LocalAuthGuard } from './local-auth.guard'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req) {
    return this.authService.login(req.user)
  }

  @UseGuards(LocalAuthGuard)
  @Post('logout')
  async logout(@Request() req) {
    return req.logout()
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user
  }
}
