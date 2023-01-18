import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common'
import { compare, hash } from 'bcryptjs'

import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UserRepository } from './user.repository'

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
    return this.userRepo.findOneAndDelete({ _id: id })
  }

  /**
   * ----------------------------------
   *              HELPERS
   * ----------------------------------
   */
  async verifyUser(email: string, password: string) {
    const user = await this.userRepo.findOne({ email })
    const isValidPassword = await compare(password, user.password)

    if (!isValidPassword) {
      throw new UnauthorizedException(`Credentials are invalid`)
    }

    return user
  }
}
