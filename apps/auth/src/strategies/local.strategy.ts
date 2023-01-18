import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  LoggerService,
  UnauthorizedException,
} from '@nestjs/common'

import { PassportStrategy } from '@nestjs/passport'
import { UsersService } from '../users/users.service'
import { Strategy } from 'passport-local'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  private readonly logger: LoggerService = new Logger(LocalStrategy.name)

  constructor(private readonly usersService: UsersService) {
    super({
      usernameField: 'email',
    })
  }

  async validate(email: string, password: string) {
    try {
      const user = await this.usersService.verifyUser(email, password)

      return user
    } catch (error) {
      this.logger.warn(`There was an error validating user credentials`)
      this.logger.error(error)

      if (error instanceof UnauthorizedException) {
        throw new UnauthorizedException(error.message)
      }

      if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message)
      }

      throw new InternalServerErrorException(`Server failed to log in user`)
    }
  }
}
