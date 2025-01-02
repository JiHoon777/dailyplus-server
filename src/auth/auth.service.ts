import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { compare, hash } from 'bcryptjs'

import { User } from '@/users/entities/user.entity'
import { UsersService } from '@/users/users.service'

import { IJwtPayload } from './auth.common'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

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

  async signin(
    user: Omit<User, 'password'>,
  ): Promise<{ access_token: string; user: Omit<User, 'password'> }> {
    const payload: IJwtPayload = { userId: user.id, email: user.email }
    return {
      access_token: this.jwtService.sign(payload),
      user,
    }
  }

  async signup({
    email,
    password,
  }: {
    email: string
    password: string
  }): Promise<{ access_token: string; user: Omit<User, 'password'> }> {
    const hashedPassword = await hash(password, 10)
    const user = await this.usersService.create(email, hashedPassword)
    const payload: IJwtPayload = { userId: user.id, email: user.email }

    const { password: _, ...result } = user
    return {
      access_token: this.jwtService.sign(payload),
      user: result,
    }
  }
}
