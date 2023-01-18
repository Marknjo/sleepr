import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UserRepository } from './user.repository'
import { hash } from 'bcryptjs'

@Injectable()
export class UsersService {
  constructor(private readonly userRepo: UserRepository) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const hashedPassword = await hash(createUserDto.password, 11)

      return this.userRepo.create({
        ...createUserDto,
        password: hashedPassword,
      })
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException(`User with email already exists`)
      }

      throw new InternalServerErrorException(
        `Server error processing the request`,
      )
    }
  }

  findAll() {
    return `This action returns all users`
  }

  async findOne(id: string) {
    return this.userRepo.findOne({ _id: id })
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userRepo.findOneAndUpdate({ _id: id }, updateUserDto)
  }

  remove(id: string) {
    return `This action removes a #${id} user`
  }
}
