import {
  ExecutionContext,
  UnauthorizedException,
  createParamDecorator,
} from '@nestjs/common'
import { Request } from 'express'
import { User } from '../users/schemas/user.schema'

export const ActiveUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): User => {
    const req = ctx.switchToHttp().getRequest<Request>()

    const user = req?.user

    if (!user) {
      throw new UnauthorizedException(`Please login`)
    }

    return user as User
  },
)
