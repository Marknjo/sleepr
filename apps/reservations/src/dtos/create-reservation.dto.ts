import { Type } from 'class-transformer'
import { IsDate, IsMongoId } from 'class-validator'

export class CreateReservationDto {
  @IsDate()
  @Type(() => Date)
  startDate: Date

  @IsDate()
  @Type(() => Date)
  endDate: Date

  @IsMongoId()
  placeId: string

  @IsMongoId()
  invoiceId: string
}
