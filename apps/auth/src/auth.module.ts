import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { UsersModule } from './users/users.module'
import { PinoLoggerModule } from '@app/common'

@Module({
  imports: [UsersModule, PinoLoggerModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
