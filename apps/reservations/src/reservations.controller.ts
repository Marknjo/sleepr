import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { ReservationsService } from './reservations.service'
import { CreateReservationDto } from './dtos/create-reservation.dto'
import { UpdateReservationDto } from './dtos/update-reservation.dto'
import { ActiveUser } from '@app/common'
import { IUserData } from '@app/common/interfaces'

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Post()
  create(
    @Body() createReservationDto: CreateReservationDto,
    @ActiveUser() activeUser: IUserData,
  ) {
    return this.reservationsService.create(createReservationDto, activeUser)
  }

  @Get()
  findAll(@ActiveUser() activeUser: IUserData) {
    console.log(activeUser)

    return this.reservationsService.findAll(activeUser)
  }

  @Get(':id')
  findOne(@Param('id') id: string, @ActiveUser() activeUser: IUserData) {
    return this.reservationsService.findOne(id, activeUser)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateReservationDto: UpdateReservationDto,
    @ActiveUser() activeUser: IUserData,
  ) {
    return this.reservationsService.update(id, updateReservationDto, activeUser)
  }

  @Delete(':id')
  remove(@Param('id') id: string, @ActiveUser() activeUser: IUserData) {
    return this.reservationsService.remove(id, activeUser)
  }
}
