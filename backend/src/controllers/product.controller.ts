import { Product } from "../models/poducts.model";
import asyncHandler from "../middleware/async.handler";
import { Request, Response } from "express";

export const getAllProducts = asyncHandler(
 async (req: Request, res: Response) => {
  const products = await Product.find({});
  res.json(products);
 }
);

export const getProduct = asyncHandler(async (req: Request, res: Response) => {
 const { id } = req.params;
 const product = await Product.findById(id);
 if (product) {
  return res.json(product);
 }
 res.status(404);
 throw new Error("Not found");
});
