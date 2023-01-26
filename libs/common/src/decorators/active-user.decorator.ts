import {
  ExecutionContext,
  UnauthorizedException,
  createParamDecorator,
} from '@nestjs/common'
import { Request } from 'express'
import { IUserData } from '../interfaces'

export const ActiveUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): IUserData => {
    const req = ctx.switchToHttp().getRequest<Request>()

    const user = req?.user

    if (!user) {
      throw new UnauthorizedException(`Please login`)
    }

    return user as IUserData
  },
)
