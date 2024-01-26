import { Schema, model } from "mongoose";

interface IUser {
 name: string;
 email: string;
 password: string;
 isAdmin: Boolean;
}

const userSchema = new Schema<IUser>(
 {
  name: {
   type: String,
   required: true,
  },
  email: {
   type: String,
   required: true,
  },
  password: {
   type: String,
   required: true,
  },
  isAdmin: {
   type: Boolean,
   required: true,
   default: false,
  },
 },
 { timestamps: true }
);

export const User = model<IUser>("User", userSchema);
