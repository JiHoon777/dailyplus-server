import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common'

import { Public } from './auth.common'
import { AuthService } from './auth.service'
import { LocalAuthGuard } from './local-auth.guard'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('signup')
  signup(@Body() input: { email: string; password: string }) {
    return this.authService.signup(input)
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('signin')
  signin(@Request() req) {
    return this.authService.signin(req.user)
  }

  // Todo: refresh token
  @Post('signout')
  async signout(@Request() req) {
    return null
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user
  }
}
