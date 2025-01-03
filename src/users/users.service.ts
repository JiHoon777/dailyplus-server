import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { User } from './entities/user.entity'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}

  async findOneByEmail(email: string) {
    return this.repository.findOne({ where: { email } })
  }

  async findOneById(id: number) {
    return this.repository.findOne({ where: { id } })
  }

  async create(email: string, password: string) {
    const user = this.repository.create({ email, password })
    return this.repository.save(user)
  }

  async updateRefreshToken(id: number, refreshToken: string | null) {
    const user = await this.findOneById(id)
    user.refreshToken = refreshToken
    return this.repository.save(user)
  }
}
