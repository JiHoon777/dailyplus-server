import { Injectable } from '@nestjs/common'

@Injectable()
export class UsersService {
  private readonly users = [
    {
      id: 1,
      email: 'thdwlgnsl@naver.com',
      password: 'tjdrhd12!@',
      name: 'songji',
      role: 'admin',
      createdAt: '2024-12-12',
      updatedAt: '2024-12-12',
    },
  ]

  async findOne(username: string) {
    return this.users.find((user) => user.name === username)
  }
}
