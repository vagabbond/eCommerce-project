import jwt from "jsonwebtoken";
import { NextFunction, Response, Request } from "express";

import asyncHandler from "./async.handler";
import { IUser, User, UserModel, IUserMethods } from "../models/user.model";
import { ObjectId } from "mongoose";

interface IUserExtend extends IUser, IUserMethods {
 _id: ObjectId;
}

declare module "express-serve-static-core" {
 interface Request {
  user?: (IUser & IUserMethods & { _id: ObjectId }) | null;
 }
}
interface JwtPayload {
 userId: string;
}

export const protect = asyncHandler(
 async (req: Request, res: Response, next: NextFunction) => {
  let token;
  token = req.cookies.jwt;
  console.log(req.user);
  if (token && process.env.JWT_SECRET) {
   try {
    const decode = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
    req.user = (await User.findById(decode.userId).select(
     "-password"
    )) as IUserExtend;
    next();
   } catch (error) {
    res.status(401);
    throw new Error("Not authorized, token failed");
   }
  } else {
   res.status(401);
   throw new Error("Not authorized, no token");
  }
 }
);

export const admin = (req: Request, res: Response, next: NextFunction) => {
 //  console.log(req);
 //  console.log(req.user?.isAdmin);
 if (req.user?.isAdmin) {
  next();
 } else {
  res.status(401);
  throw new Error("Not authorized as admin");
 }
};
