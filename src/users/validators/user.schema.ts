import * as Joi from 'joi';

class CreateUserDto {
  name: string;
  surname: string;
  username: string;
  birthDate: string;
}

const createUserSchema = Joi.object({
  name: Joi.string().required(),
  surname: Joi.string().required(),
  username: Joi.string().required(),
  birthDate: Joi.date().iso().required(),
});

class GetUserDto {
  userId: string;
}

const getUserSchema = Joi.object({
  userId: Joi.string().hex().length(24).required(),
});

class UpdateUserDto {
  name: string;
  surname: string;
  username: string;
  birthDate: string;
}

const updateUserSchema = Joi.object({
  name: Joi.string(),
  surname: Joi.string(),
  username: Joi.string(),
  birthDate: Joi.date(),
});

class DeleteUserDto {
  userId: string;
}

const deleteUserSchema = Joi.object({
  userId: Joi.string().hex().length(24).required(),
});

class SearchUserDto {
  minAge?: number;
  maxAge?: number;
  username?: string;
}

const SearchUserDtoSchema = Joi.object({
  minAge: Joi.number().min(1).optional(),
  maxAge: Joi.number().max(140).optional(),
  username: Joi.string().optional(),
}).or('minAge', 'maxAge', 'username');

export {
  createUserSchema,
  CreateUserDto,
  updateUserSchema,
  UpdateUserDto,
  GetUserDto,
  getUserSchema,
  DeleteUserDto,
  deleteUserSchema,
  SearchUserDto,
  SearchUserDtoSchema,
};
