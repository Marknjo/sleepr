import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { UserRepository } from './user.repository'
import { DatabaseModule } from '@app/common'
import { User, UsersSchema } from './schemas/user.schema'

@Module({
  imports: [
    DatabaseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          const schema = UsersSchema

          return schema
        },
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService, UserRepository],
  exports: [UsersService],
})
export class UsersModule {}
