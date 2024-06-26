import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../interfaces/user.interface';
import { BlockedUser } from '../interfaces/blockedUser.interface';
import { CreateUserDto, UpdateUserDto, SearchUserDto } from '../validators/user.schema';

@Injectable()
class UserDAO {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    @InjectModel('BlockedUser')
    private readonly blockedUserModel: Model<BlockedUser>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel({
      ...createUserDto,
      birthDate: new Date(createUserDto.birthDate),
    });
    return createdUser.save();
  }

  async findOne(userId: string): Promise<User | null> {
    return this.userModel.findById(userId).lean().exec();
  }

  async update(userId: string, updateUserDto: UpdateUserDto): Promise<User | null> {
    return this.userModel
      .findByIdAndUpdate(userId, { $set: updateUserDto }, { new: true })
      .lean()
      .exec();
  }

  async delete(userId: string): Promise<User | null> {
    return this.userModel.findByIdAndDelete(userId).lean().exec();
  }

  async search(userId: string, searchUserDto: SearchUserDto): Promise<User[]> {
    const query: any = {};
    const today = new Date();

    if (searchUserDto.maxAge) {
      query.birthDate = {};
      const minBirthDate = new Date(today.getFullYear() - searchUserDto.maxAge, today.getMonth(), today.getDate() + 1);
      query.birthDate.$gte = minBirthDate.toISOString();
    }

    if (searchUserDto.minAge) {
      query.birthDate = { ...query.birthDate };
      const maxBirthDate = new Date(today.getFullYear() - searchUserDto.minAge - 1, today.getMonth(), today.getDate() + 1);
      query.birthDate.$lte = maxBirthDate.toISOString();
    }

    if (searchUserDto.username) {
      const regex = new RegExp(searchUserDto.username, 'i');
      query.username = { $regex: regex };
    }

    query._id = {
      $nin: await this.blockedUserModel.distinct('blockedUsers', { userId }),
    };

    return this.userModel.find(query).lean().exec();
  }
}

export { UserDAO };
