import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { UsersModule } from './users/users.module'
import { DatabaseModule, PinoLoggerModule } from '@app/common'

@Module({
  imports: [DatabaseModule, PinoLoggerModule, UsersModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
