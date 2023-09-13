import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common"
import { CreateUserDto } from "./dto/create-user.dto"
import { UpdateUserDto } from "./dto/update-user.dto"
import { UserRepository } from "./repositories/user.repository"

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto) {
    const findUser = await this.userRepository.findByEmail(createUserDto.email)
    if (findUser) {
      throw new ConflictException("User already exists")
    }
    const user = await this.userRepository.create(createUserDto)
    return user
  }

  async findAll() {
    const users = await this.userRepository.findAll()
    return users
  }

  async findOne(id: string) {
    const findUser = await this.userRepository.findOne(id)

    if (!findUser) {
      throw new NotFoundException("User not found")
    }
    return findUser
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const findUser = await this.userRepository.findOne(id)

    if (!findUser) {
      throw new NotFoundException("User not found")
    }
    return this.userRepository.update(id, updateUserDto)
  }

  async delete(id: string) {
    const findUser = await this.userRepository.findOne(id)

    if (!findUser) {
      throw new NotFoundException("User not found")
    }
    return this.userRepository.delete(id)
  }
}
