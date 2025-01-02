import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { compare, hash } from 'bcryptjs'
import { Response } from 'express'

import { IConfiguration } from '@/config'
import { User } from '@/users/entities/user.entity'
import { UsersService } from '@/users/users.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService<IConfiguration>,
  ) {}

  private get jwtConfig() {
    return this.configService.get('jwt', { infer: true })
  }

  async signin(
    user: Omit<User, 'password'>,
    response: Response,
  ): Promise<Omit<User, 'password'>> {
    const {
      accessToken,
      refreshToken,
      expiresAccessToken,
      expiresRefreshToken,
    } = await this.generateTokens(user)

    const hashedRefreshToken = await hash(refreshToken, 10)
    await this.usersService.updateRefreshToken(user.id, hashedRefreshToken)

    response.cookie('Authentication', accessToken, {
      httpOnly: true,
      secure: this.configService.get('env') === 'prod',
      expires: expiresAccessToken,
    })
    response.cookie('Refresh', refreshToken, {
      httpOnly: true,
      secure: this.configService.get('env') === 'prod',
      expires: expiresRefreshToken,
    })

    return user
  }

  async signup({
    email,
    password,
  }: {
    email: string
    password: string
  }): Promise<Omit<User, 'password'>> {
    const hashedPassword = await hash(password, 10)
    const user = await this.usersService.create(email, hashedPassword)

    const { password: _, ...result } = user
    return result
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<Omit<User, 'password'> | null> {
    const user = await this.usersService.findOneByEmail(email)

    if (user && (await compare(password, user.password))) {
      const { password: _, ...result } = user
      return result
    }

    return null
  }

  async validateUserRefreshToken(refreshToken: string, userId: number) {
    const user = await this.usersService.findOneById(userId)

    const isRefreshTokenMatching = await compare(
      refreshToken,
      user.refreshToken,
    )
    if (isRefreshTokenMatching) {
      const { password: _, ...result } = user
      return result
    }

    return null
  }

  async signout(userId: number, response: Response) {
    await this.usersService.updateRefreshToken(userId, null)

    response.cookie('Authentication', '', {
      httpOnly: true,
      secure: this.configService.get('env') === 'prod',
      expires: new Date(0),
    })
    response.cookie('Refresh', '', {
      httpOnly: true,
      secure: this.configService.get('env') === 'prod',
      expires: new Date(0),
    })

    return { message: '로그아웃되었습니다.' }
  }

  private async generateTokens(user: Omit<User, 'password'>) {
    const expiresAccessToken = new Date()
    expiresAccessToken.setMilliseconds(
      expiresAccessToken.getTime() + parseInt(this.jwtConfig.secretExpiration),
    )
    const expiresRefreshToken = new Date()
    expiresRefreshToken.setMilliseconds(
      expiresRefreshToken.getTime() +
        parseInt(this.jwtConfig.refreshSecretExpiration),
    )

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { userId: user.id },
        {
          secret: this.jwtConfig.secretKey,
          expiresIn: this.jwtConfig.secretExpiration + 'ms',
        },
      ),
      this.jwtService.signAsync(
        { userId: user.id },
        {
          secret: this.jwtConfig.refreshSecretKey,
          expiresIn: this.jwtConfig.refreshSecretExpiration + 'ms',
        },
      ),
    ])

    return {
      accessToken,
      refreshToken,
      expiresAccessToken,
      expiresRefreshToken,
    }
  }
}
