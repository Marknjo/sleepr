import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ClientsModule, Transport } from '@nestjs/microservices'

import {
  AUTH_SERVICE_KEY,
  DatabaseModule,
  JwtAuthGuard,
  PAYMENTS_SERVICE_KEY,
  PinoLoggerModule,
} from '@app/common'

import { ReservationsService } from './reservations.service'
import { ReservationsController } from './reservations.controller'
import { ReservationsRepository } from './reservations.repository'
import { Reservation, ReservationSchema } from './schemas/reservation.schema'
import validationSchema from './utils/env.utils'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '../.env.development',
      validationSchema: validationSchema(),
    }),
    DatabaseModule,
    DatabaseModule.forFeatureAsync([
      {
        name: Reservation.name,
        useFactory: () => {
          const schema = ReservationSchema

          return schema
        },
      },
    ]),
    PinoLoggerModule,
    ClientsModule.registerAsync([
      {
        imports: [ConfigModule],
        name: AUTH_SERVICE_KEY,
        useFactory: (config: ConfigService) => {
          const tcpPort = config.getOrThrow('TCP_AUTH_PORT')
          const tcpHost = config.getOrThrow('TCP_AUTH_HOST')

          return {
            options: {
              transport: Transport.TCP,
              port: tcpPort,
              host: tcpHost,
            },
          }
        },
        inject: [ConfigService],
      },
      {
        imports: [ConfigModule],
        name: PAYMENTS_SERVICE_KEY,
        useFactory: (config: ConfigService) => {
          const tcpPort = config.getOrThrow('TCP_PAYMENTS_PORT')
          const tcpHost = config.getOrThrow('TCP_PAYMENTS_HOST')

          return {
            options: {
              transport: Transport.TCP,
              port: tcpPort,
              host: tcpHost,
            },
          }
        },
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [ReservationsController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    ReservationsService,
    ReservationsRepository,
  ],
})
export class ReservationsModule {}
