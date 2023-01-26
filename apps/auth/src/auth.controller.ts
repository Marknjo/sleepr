import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { Response } from 'express'
import { MessagePattern, Payload } from '@nestjs/microservices'

import { ActiveUser } from '@app/common'
import { User } from './users/schemas/user.schema'

import { LocalAuthGuard } from './guards/local-auth.guard'
import { CreateUserDto } from './users/dto/create-user.dto'
import { JwtAuthGuard } from './guards/jwt-auth.guard'

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

  @Post('sign-up')
  async signUp(
    @Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.authService.signUp(createUserDto, res)

    res.send(user)
  }

  @UseGuards(JwtAuthGuard)
  @MessagePattern('authenticate')
  async authenticate(@Payload() data: unknown) {
    const user = data['user']

    user['id'] = user._id.toString()

    delete user['_id']
    delete user['password']

    return user
  }
}
