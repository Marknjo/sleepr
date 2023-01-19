import { Inject, Injectable } from '@nestjs/common'
import { User } from './users/schemas/user.schema'
import { Response } from 'express'
import { ConfigType } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { jwtConfigs } from './configs/jwt-configs'
import { TokenPayload } from './interfaces/token-payload.interface'

@Injectable()
export class AuthService {
  constructor(
    @Inject(jwtConfigs.KEY)
    private readonly jwtConfig: ConfigType<typeof jwtConfigs>,

    private readonly jwtService: JwtService,
  ) {}

  async signIn(activeUserData: User, res: Response) {
    const tokenPayload: TokenPayload = {
      userId: activeUserData._id.toHexString(),
    }

    const expires = new Date()
    expires.setSeconds(expires.getSeconds() * this.jwtConfig.accessTokenTtl)

    const token = await this.jwtService.signAsync(tokenPayload, {
      expiresIn: this.jwtConfig.accessTokenTtl,
      secret: this.jwtConfig.secret,
      issuer: this.jwtConfig.issuer,
      audience: this.jwtConfig.audience,
    })

    res.cookie('Authentication', token, {
      httpOnly: true,
      expires,
    })

    return token
  }
}
