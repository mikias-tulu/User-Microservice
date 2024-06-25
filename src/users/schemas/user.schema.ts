import { Schema, Document } from 'mongoose';
import { User } from '../interfaces/user.interface';

const UserSchema: Schema<User> = new Schema(
  {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    birthDate: { type: Date, required: true },
  },
  { collection: 'users' },
);

UserSchema.index({ username: 'text' });
UserSchema.index({ birthDate: 1 });

export { UserSchema };
