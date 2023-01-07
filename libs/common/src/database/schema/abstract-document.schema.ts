import { Prop, Schema } from '@nestjs/mongoose'
import { HydratedDocument, SchemaTypes, Types } from 'mongoose'

@Schema({
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
  timestamps: true,
})
export abstract class Abstract {
  @Prop({ type: SchemaTypes.ObjectId })
  _id: Types.ObjectId
}

export type TAbstractDoc = HydratedDocument<Abstract>
