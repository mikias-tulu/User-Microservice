import { Controller, Post, Body, Param, BadRequestException } from '@nestjs/common';
import * as Joi from 'joi';
import { BlockUserService } from '../services/blockUser.service';
import { UnblockUserDto, BlockUserDto } from '../validators/blockedUser.schema';
import { BlockedUser } from '../interfaces/blockedUser.interface';

@Controller('blocked-users')
export class BlockUserController {
  constructor(private readonly blockUserService: BlockUserService) {}

  @Post(':userId/block')
  async blockUser(
    @Param('userId') userId: string,
    @Body() blockUserDto: BlockUserDto,
  ): Promise<{ message: string; blockedUser: BlockedUser }> {
    const { error: userIdError } = Joi.string()
      .length(24)
      .hex()
      .validate(userId);
    if (userIdError) {
      throw new BadRequestException('Invalid userId format');
    }

    const { error, value } = Joi.object(blockUserDto).validate(blockUserDto);
    if (error) {
      throw new BadRequestException(error.details[0].message);
    }
    const { blockedUser } = await this.blockUserService.blockUsers(userId, value);
    return {
      blockedUser,
      message: 'Users blocked successfully',
    };
  }

  @Post(':userId/unblock')
  async unblockUser(
    @Param('userId') userId: string,
    @Body() unblockUserDto: UnblockUserDto,
  ): Promise<{ message: string; unblockedUser: BlockedUser }> {
    const { error: userIdError } = Joi.string()
      .length(24)
      .hex()
      .validate(userId);
    if (userIdError) {
      throw new BadRequestException('Invalid userId format');
    }

    const { error, value } = Joi.object(unblockUserDto).validate(unblockUserDto);
    if (error) {
      throw new BadRequestException(error.details[0].message);
    }
    const { unblockedUser } = await this.blockUserService.unblockUsers(userId, value);
    return {
      message: 'Users unblocked successfully',
      unblockedUser,
    };
  }
}
