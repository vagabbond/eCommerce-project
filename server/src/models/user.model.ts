import { Model, Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser {
 name: string;
 email: string;
 password: string;
 isAdmin: Boolean;
}
export interface IUserMethods {
 matchPassword(password: string): Boolean;
}
export type UserModel = Model<IUser, {}, IUserMethods>;
const userSchema = new Schema<IUser, UserModel, IUserMethods>(
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
userSchema.method(
 "matchPassword",
 async function matchPassword(password: string) {
  return await bcrypt.compare(password, this.password);
 }
);
userSchema.pre("save", async function (next) {
 if (!this.isModified("password")) {
  next();
 }
 const salt = await bcrypt.genSalt(10);
 this.password = await bcrypt.hash(this.password, salt);
});
export const User = model<IUser, UserModel>("User", userSchema);
