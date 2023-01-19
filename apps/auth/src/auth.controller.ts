import { Controller, Post, Res, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'

import { ActiveUser } from './decorators/active-user.decorator'
import { User } from './users/schemas/user.schema'
import { Response } from 'express'

import { LocalAuthGuard } from './guards/local-auth.guard'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  async signIn(
    @ActiveUser() activeUserData: User,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.authService.signIn(activeUserData, res)

    res.send(activeUserData)
  }
}
