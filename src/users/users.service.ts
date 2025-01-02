import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { User } from './entities/user.entity'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOneByEmail(email: string) {
    return this.usersRepository.findOne({ where: { email } })
  }

  async findOneById(id: number) {
    return this.usersRepository.findOne({ where: { id } })
  }

  async create(email: string, password: string) {
    const user = this.usersRepository.create({ email, password })
    return this.usersRepository.save(user)
  }

  async updateRefreshToken(id: number, refreshToken: string | null) {
    const user = await this.findOneById(id)
    user.refreshToken = refreshToken
    return this.usersRepository.save(user)
  }
}
