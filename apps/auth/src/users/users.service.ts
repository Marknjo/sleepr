import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UserRepository } from './user.repository'

@Injectable()
export class UsersService {
  constructor(private readonly userRepo: UserRepository) {}

  create(createUserDto: CreateUserDto) {
    return this.userRepo.create(createUserDto)
  }

  findAll() {
    return `This action returns all users`
  }

  findOne(id: string) {
    return `This action returns a #${id} user`
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`
  }

  remove(id: string) {
    return `This action removes a #${id} user`
  }
}
