import { Inject, Injectable } from '@nestjs/common'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { jwtConfigs } from '../configs/jwt-configs'
import { UsersService } from '../users/users.service'
import { ConfigType } from '@nestjs/config'
import { TokenPayload } from '../interfaces/token-payload.interface'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UsersService,

    @Inject(jwtConfigs.KEY)
    private readonly jwtConfig: ConfigType<typeof jwtConfigs>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: any) =>
          request?.cookies?.Authentication ||
          request?.Authentication ||
          request?.headers.Authentication,
      ]),
      secretOrKey: jwtConfig.secret,
    })
  }

  async validate({ userId }: TokenPayload) {
    return this.userService.findOne(userId)
  }
}
