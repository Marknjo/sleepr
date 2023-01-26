import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'

import { DatabaseModule, PinoLoggerModule } from '@app/common'

import validationSchema from './utils/env.utils'
import { jwtConfigs } from './configs/jwt-configs'
import { UsersModule } from './users/users.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtStrategy } from './strategies/jwt.strategy'
import { LocalStrategy } from './strategies/local.strategy'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../.env.development',
      validationSchema: validationSchema(),
    }),
    DatabaseModule,
    PinoLoggerModule,
    JwtModule.registerAsync(jwtConfigs.asProvider()),
    ConfigModule.forFeature(jwtConfigs),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
