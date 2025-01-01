import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'

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

    if (user && (await bcrypt.compare(password, user.password))) {
      const { password: _, ...result } = user
      return result
    }

    return null
  }

  async login(user: Omit<User, 'password'>): Promise<{ access_token: string }> {
    const payload: IJwtPayload = { userId: user.id, email: user.email }
    return {
      access_token: this.jwtService.sign(payload),
    }
  }
}
