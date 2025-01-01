import { SetMetadata } from '@nestjs/common'

export const IS_PUBLIC_KEY = 'isPublic'
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true)

export enum UserRole {
  USER = 5,
  ADMIN = 10,
}

export const USER_ROLE_KEY = 'role'
export const Roles = (role: UserRole) => SetMetadata(USER_ROLE_KEY, role)

export interface IJwtPayload {
  userId: number
  email: string
}
