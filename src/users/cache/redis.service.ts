import { Inject, Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { Logger } from '@nestjs/common';

@Injectable()
export class RedisService {
  private readonly logger = new Logger(RedisService.name);

  constructor(@Inject('REDIS_CLIENT') private readonly redisClient: Redis) {}

  async get(key: string): Promise<string | null> {
    try {
      const value = await this.redisClient.get(key);
      return value;
    } catch (error) {
      this.logger.error(`Error getting key ${key} from Redis: ${error}`);
      return null;
    }
  }

  async set(
    key: string,
    value: string,
    expirationTime?: number,
  ): Promise<boolean> {
    try {
      if (expirationTime) {
        await this.redisClient.set(key, value, 'EX', expirationTime); // Set with expiration time
      } else {
        await this.redisClient.set(key, value); // Set without expiration
      }
      return true;
    } catch (error) {
      this.logger.error(`Error setting key ${key} in Redis: ${error}`);
      return false;
    }
  }

  async del(key: string): Promise<boolean> {
    try {
      await this.redisClient.del(key);
      return true;
    } catch (error) {
      this.logger.error(`Error deleting key ${key} from Redis: ${error}`);
      return false;
    }
  }
}
