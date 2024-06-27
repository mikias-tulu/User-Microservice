import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { BlockedUserSchema } from './schemas/blockedUser.schema';
import { UserController } from './controllers/user.controller';
import { BlockUserController } from './controllers/blockUser.controller';
import { UserService } from './services/user.service';
import { BlockUserService } from './services/blockUser.service';
import { UserDAO } from './dao/user.dao';
import { BlockedUserDAO } from './dao/blockedUser.dao';
import { RedisModule } from './cache/redis.module';
import { RedisService } from './cache/redis.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'BlockedUser', schema: BlockedUserSchema },
    ]),
    RedisModule,
  ],
  controllers: [UserController, BlockUserController],
  providers: [
    UserService,
    BlockUserService,
    UserDAO,
    BlockedUserDAO,
    RedisService,
  ],
})
export class UserModule {}
