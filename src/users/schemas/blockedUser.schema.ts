import { Schema, Document } from 'mongoose';
import { BlockedUser } from '../interfaces/blockedUser.interface';

const BlockedUserSchema: Schema<BlockedUser> = new Schema(
  {
    userId: { type: String, unique: true },
    blockedUsers: [{ type: String }],
  },
  { collection: 'blockedUsers' },
);

export { BlockedUserSchema };
