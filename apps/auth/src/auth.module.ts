import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { UsersModule } from './users/users.module'
import { DatabaseModule, PinoLoggerModule } from '@app/common'
import { JwtModule } from '@nestjs/jwt'
import { jwtConfigs } from './configs/jwt-configs'
import { ConfigModule } from '@nestjs/config'
import validationSchema from '../utils/env.utils'

@Module({
  imports: [
    ConfigModule.forRoot({
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
  providers: [AuthService],
})
export class AuthModule {}
