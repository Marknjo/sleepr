import { Abstract } from '@app/common'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

@Schema({
  versionKey: false,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
  timestamps: true,
})
export class Reservation extends Abstract {
  @Prop()
  startDate: Date

  @Prop()
  endDate: Date

  @Prop()
  userId: string

  @Prop()
  invoiceId: string
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation)

export type TReservationDoc = HydratedDocument<Reservation>
