import { Response } from "express";
import jwt from "jsonwebtoken";
import { ObjectId, Schema } from "mongoose";

export const generateToken = (res: Response, userId: any) => {
 if (process.env.JWT_SECRET) {
  const token = jwt.sign(
   {
    userId,
   },
   process.env.JWT_SECRET,
   {
    expiresIn: "3d",
   }
  );
  console.log(token);
  res.cookie("jwt", token);
  console.log(res.cookie);
 }
};

// , {
//    httpOnly: true,
//    secure: true,
//    sameSite: "strict",
//    maxAge: 30 * 24 * 60 * 60 * 1000,
//   }
