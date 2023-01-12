import { Abstract } from '@app/common'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

@Schema({
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  timestamps: true,
  versionKey: false,
})
export class User extends Abstract {
  @Prop()
  email: string

  @Prop()
  password: string
}

export const UserSchema = SchemaFactory.createForClass(User)

export type TUserDoc = HydratedDocument<User>
