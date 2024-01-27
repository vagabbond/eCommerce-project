import e, { Request, Response } from "express";

import { generateToken } from "../utils/generateToken";
import { IUser, User, IUserMethods } from "../models/user.model";
import asyncHandler from "../middleware/async.handler";
import { ObjectId } from "mongoose";

interface IUserExtend extends IUser, IUserMethods {
 _id: ObjectId;
}

export const authUser = asyncHandler(async (req: Request, res: Response) => {
 const { email, password } = req.body;
 const user = await User.findOne({ email });
 if (user && (await user.matchPassword(password)) && process.env.JWT_SECRET) {
  generateToken(res, user._id);
  return res.status(200).json({
   _id: user._id,
   name: user.name,
   email: user.email,
   isAdmin: user.isAdmin,
  });
 } else {
  res.status(401);
  throw new Error("Invalid email or password");
 }
});

export const registerUser = asyncHandler(
 async (req: Request, res: Response) => {
  const { email, name, password } = req.body;
  const ifExist = await User.findOne({ email });

  if (!ifExist) {
   const user = await User.create({ email, name, password });
   if (user) {
    generateToken(res, user._id);
    return res.status(201).json({
     email: user.email,
     name: user.name,
     isAdmin: user.isAdmin,
     _id: user._id,
    });
   } else {
    res.status(400);
    throw new Error("Invalid user data");
   }
  } else {
   res.status(400);
   throw new Error("User already exist");
  }
 }
);

export const logoutUser = asyncHandler(async (req: Request, res: Response) => {
 res.cookie("jwt", "", {
  httpOnly: true,
  expires: new Date(0),
 });
 res.status(200).json({ message: "Logged out succesfully" });
});

export const getUserProfile = asyncHandler(
 async (req: Request, res: Response) => {
  const user = await User.findById(req.user?._id);
  if (user) {
   return res.status(200).json({
    email: user.email,
    name: user.name,
    isAdmin: user.isAdmin,
    _id: user._id,
   });
  } else {
   res.status(404);
   throw new Error("User not found");
  }
 }
);

export const updateUserProfile = asyncHandler(
 async (req: Request, res: Response) => {
  const user = await User.findById(req.user?._id);
  if (user) {
   user.name = req.body.name || user.name;
   user.email = req.body.email || user.email;
   if (req.body.password) {
    user.password = req.body.password || user.password;
   }
   const updatedUser = await user.save();
   return res.status(200).json({
    email: updatedUser.email,
    name: updatedUser.name,
    isAdmin: updatedUser.isAdmin,
    _id: updatedUser._id,
   });
  } else {
   res.status(404);
   throw new Error("User not found");
  }
 }
);

export const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
 res.send("get all users user");
});
export const getUserById = asyncHandler(async (req: Request, res: Response) => {
 res.send("get user by id user");
});

export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
 res.send("delete users user");
});

export const updateUser = asyncHandler(async (req: Request, res: Response) => {
 res.send("update user user");
});
