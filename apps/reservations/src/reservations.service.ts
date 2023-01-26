import { Injectable } from '@nestjs/common'
import { CreateReservationDto } from './dtos/create-reservation.dto'
import { UpdateReservationDto } from './dtos/update-reservation.dto'
import { ReservationsRepository } from './reservations.repository'
import { IUserData } from '@app/common/interfaces'

@Injectable()
export class ReservationsService {
  constructor(private readonly reservationRepository: ReservationsRepository) {}

  create(createReservationDto: CreateReservationDto, activeUser: IUserData) {
    return this.reservationRepository.create({
      ...createReservationDto,
      userId: activeUser.id,
    })
  }

  findAll(activeUser: IUserData) {
    return this.reservationRepository.find({
      userId: activeUser.id,
    })
  }

  findOne(id: string, activeUser: IUserData) {
    return this.reservationRepository.findOne({
      _id: id,
      userId: activeUser.id,
    })
  }

  update(
    id: string,
    updateReservationDto: UpdateReservationDto,
    activeUser: IUserData,
  ) {
    return this.reservationRepository.findOneAndUpdate(
      { _id: id, userId: activeUser.id },
      { $set: updateReservationDto },
    )
  }

  remove(id: string, activeUser: IUserData) {
    return this.reservationRepository.findOneAndDelete({
      _id: id,
      userId: activeUser.id,
    })
  }
}
