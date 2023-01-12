import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { UserRepository } from './user.repository'
import { DatabaseModule } from '@app/common'
import { User, UserSchema } from './schemas/user.schema'

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          const schema = UserSchema

          return schema
        },
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService, UserRepository],
})
export class UsersModule {}
