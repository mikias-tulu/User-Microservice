import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { RedisService } from '../cache/redis.service';
import { User } from '../interfaces/user.interface';
import {
  CreateUserDto,
  GetUserDto,
  DeleteUserDto,
  UpdateUserDto,
  SearchUserDto,
} from '../validators/user.schema';
import { UserDAO } from '../dao/user.dao';

@Injectable()
class UserService {
  constructor(
    private readonly userDAO: UserDAO,
    private readonly redisService: RedisService,
  ) {} // Inject the DAO

  async create(
    createUserDto: CreateUserDto,
  ): Promise<{ message: string; user: User }> {
    try {
      const savedUser = await this.userDAO.create(createUserDto);
      return {
        message: 'User created successfully',
        user: savedUser,
      };
    } catch (err) {
      if (err.code === 11000) {
        throw new BadRequestException('Username already exists');
      }
      throw new InternalServerErrorException('Failed to create user');
    }
  }

  async findOne(getUserDto: GetUserDto): Promise<User> {
    const userId = getUserDto.userId;
    const redisKey = `user:${userId}`;

    const userJson = await this.redisService.get(redisKey);
    if (userJson) {
      return JSON.parse(userJson) as User;
    }
    const user = await this.userDAO.findOne(getUserDto.userId);
    if (!user) {
      throw new NotFoundException(
        `User with ID ${getUserDto.userId} not found`,
      );
    }

    this.redisService.set(redisKey, JSON.stringify(user), 86400);

    return user;
  }

  async update(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<{ message: string; user: User }> {
    const updatedUser = await this.userDAO.update(userId, updateUserDto);
    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    return { user: updatedUser, message: 'User updated successfully' };
  }

  async delete(deleteUserDto: DeleteUserDto): Promise<{ message: string }> {
    const user = await this.userDAO.delete(deleteUserDto.userId);
    if (!user) {
      throw new NotFoundException(
        `User with ID ${deleteUserDto.userId} not found`,
      );
    }

    return { message: 'User deleted successfully' };
  }

  async search(
    userId: string,
    searchUserDto: SearchUserDto,
  ): Promise<{ users: User[] }> {
    const users = await this.userDAO.search(userId, searchUserDto);
    return { users };
  }
}

export { UserService };
