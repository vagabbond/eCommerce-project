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
  res.cookie("jwt", token, {
   httpOnly: true,
   sameSite: "strict",
   maxAge: 3 * 24 * 60 * 60 * 1000,
  });
 }
};
