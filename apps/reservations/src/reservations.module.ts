import { Module } from '@nestjs/common'
import { ReservationsService } from './reservations.service'
import { ReservationsController } from './reservations.controller'
import { DatabaseModule, PinoLoggerModule } from '@app/common'
import { ReservationsRepository } from './reservations.repository'
import { Reservation, ReservationSchema } from './schemas/reservation.schema'

@Module({
  imports: [
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
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService, ReservationsRepository],
})
export class ReservationsModule {}
