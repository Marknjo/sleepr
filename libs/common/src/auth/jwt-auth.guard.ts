import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common'
import { Request } from 'express'
import { Observable, map, tap } from 'rxjs'
import { AUTH_SERVICE_KEY } from '../constants/services'
import { ClientProxy } from '@nestjs/microservices'
import { IUserData } from '../interfaces'

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    @Inject(AUTH_SERVICE_KEY)
    private readonly authClient: ClientProxy,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest<Request>()

    const jwt = this.extractToken(req)

    if (!jwt) {
      return false
    }

    return this.authClient
      .send<IUserData>('authenticate', {
        Authentication: jwt,
      })
      .pipe(
        tap(res => (req.user = res)),
        map(() => true),
      )
  }

  extractToken(req: Request) {
    let jwt = req.cookies?.Authentication

    if (!jwt) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_, token] = (req.headers?.Authentication as string)?.split(' ')
      jwt = token
    }

    return jwt
  }
}
