import { AbstractRepository } from '@app/common'
import { Logger } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { Reservation } from './schemas/reservation.schema'

export class ReservationsRepository extends AbstractRepository<Reservation> {
  protected logger: Logger = new Logger(ReservationsRepository.name)

  constructor(
    @InjectModel(Reservation.name)
    reservationModel: Model<Reservation>,
  ) {
    super(reservationModel)
  }
}
