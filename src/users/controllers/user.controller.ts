import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Query,
  Param,
  BadRequestException,
} from '@nestjs/common';
import * as Joi from 'joi';
import { UserService } from '../services/user.service';
import {
  CreateUserDto,
  GetUserDto,
  UpdateUserDto,
  DeleteUserDto,
  SearchUserDto,
  SearchUserDtoSchema,
} from '../validators/user.schema';
import { User } from '../interfaces/user.interface';

@Controller('user')
class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<{ message: string; user?: User }> {
    const { error, value } = Joi.object(createUserDto).validate(createUserDto);
    if (error) {
      throw new BadRequestException(error.details[0].message);
    }
    const { user } = await this.userService.create(value);
    return {
      message: 'User created successfully',
      user,
    };
  }

  @Get(':userId')
  async findOne(
    @Param() getUserDto: GetUserDto,
  ): Promise<{ user: User; message: string }> {
    const { error, value } = Joi.object(getUserDto).validate(getUserDto);
    if (error) {
      throw new BadRequestException(error.details[0].message);
    }
    const user = await this.userService.findOne(value);
    return {
      message: 'User returned successfully',
      user,
    };
  }

  @Put(':userId')
  async update(
    @Param('userId') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<{ message: string; user?: User }> {
    const { error: userIdError } = Joi.string()
      .length(24)
      .hex()
      .validate(userId);
    if (userIdError) {
      throw new BadRequestException('Invalid userId format');
    }

    const { error, value } = Joi.object(updateUserDto).validate(updateUserDto);
    if (error) {
      throw new BadRequestException(error.details[0].message);
    }
    const { user } = await this.userService.update(userId, value);
    return { user, message: 'User updated successfully' };
  }

  @Delete(':userId')
  async delete(
    @Param() deleteUserDto: DeleteUserDto,
  ): Promise<{ message: string }> {
    const { error, value } = Joi.object(deleteUserDto).validate(deleteUserDto);
    if (error) {
      throw new BadRequestException(error.details[0].message);
    }
    await this.userService.delete(value);
    return { message: 'User deleted successfully' };
  }

  @Get(':userId/actions/search')
  async search(
    @Param('userId') userId: string,
    @Query() query: SearchUserDto,
  ): Promise<{ users: User[]; message: string }> {
    const { error: userIdError } = Joi.string()
      .length(24)
      .hex()
      .validate(userId);
    if (userIdError) {
      throw new BadRequestException('Invalid userId format');
    }
    const { error, value } = Joi.object(query).validate(query);
    if (error) {
      throw new BadRequestException(error.details[0].message);
    }

    let message;
    const { users } = await this.userService.search(userId, value);
    if (users.length) {
      message = 'Users returned successfully';
    } else {
      message = 'No users found';
    }
    return {
      users,
      message,
    };
  }
}

export { UserController };
