import * as Joi from 'joi';

class UnblockUserDto {
  userId: string;
  unblockedUsers: string[];
}

const unblockUserSchema = Joi.object({
  unblockedUsers: Joi.array().items(Joi.string().hex().length(24)).required(),
});

class BlockUserDto {
  userId: string;
  blockedUsers: string[];
}

const blockUserSchema = Joi.object({
  blockedUsers: Joi.array().items(Joi.string().hex().length(24)).required(),
});

export { UnblockUserDto, unblockUserSchema, BlockUserDto, blockUserSchema };
