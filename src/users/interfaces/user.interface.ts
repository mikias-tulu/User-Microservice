import { Document } from 'mongoose';

export interface User extends Document {
  name: string;
  surname: string;
  username: string;
  birthDate: Date;
}
