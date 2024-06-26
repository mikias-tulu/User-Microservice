import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BlockedUser } from '../interfaces/blockedUser.interface';
import { BlockUserDto, UnblockUserDto } from '../validators/blockedUser.schema';

@Injectable()
class BlockedUserDAO {
  constructor(
    @InjectModel('BlockedUser')
    private readonly blockedUserModel: Model<BlockedUser>,
  ) {}

  async blockUsers(
    userId: string,
    blockUserDto: BlockUserDto,
  ): Promise<BlockedUser> {
    const user = await this.blockedUserModel
      .findOneAndUpdate(
        { userId },
        { $addToSet: { blockedUsers: blockUserDto.blockedUsers } },
        { new: true, upsert: true },
      )
      .lean()
      .exec();
    return user as BlockedUser;
  }

  async unblockUsers(
    userId: string,
    unblockUserDto: UnblockUserDto,
  ): Promise<BlockedUser> {
    const user = await this.blockedUserModel
      .findOneAndUpdate(
        { userId },
        { $pullAll: { blockedUsers: unblockUserDto.unblockedUsers } },
        { new: true },
      )
      .lean()
      .exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user as BlockedUser;
  }
}

export { BlockedUserDAO };
