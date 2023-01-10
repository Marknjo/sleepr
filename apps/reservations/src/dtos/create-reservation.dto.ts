import { Type } from 'class-transformer'
import { IsDate, IsMongoId, IsNotEmpty } from 'class-validator'

export class CreateReservationDto {
  @IsDate()
  @Type(() => Date)
  startDate: Date

  @IsDate()
  @Type(() => Date)
  endDate: Date

  @IsMongoId()
  @IsNotEmpty()
  placeId: string

  @IsMongoId()
  @IsNotEmpty()
  invoiceId: string
}
