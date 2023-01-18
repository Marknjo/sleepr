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
  @Prop({
    unique: true,
  })
  email: string

  @Prop()
  password: string
}

export const UsersSchema = SchemaFactory.createForClass(User)

export type TUserDoc = HydratedDocument<User>
