import { Document } from 'mongoose';

export interface BlockedUser extends Document {
  userId: string;
  blockedUsers: string[];
}
