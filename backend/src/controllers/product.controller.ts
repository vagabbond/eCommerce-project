import { Product } from "../models/poducts.model.js";
import asyncHandler from "../middleware/async.handler.js";
import { Request, Response } from "express";

export const getAllProducts = asyncHandler(
 async (req: Request, res: Response) => {
  const pageSize = 4;
  const page = Number(req.query.pageNumber) || 1;
  console.log("pageNumber", req.query.pageNumber);
  const keyword = req.query.keyword
   ? {
      name: {
       $regex: req.query.keyword,
       $options: "i",
      },
     }
   : {};
  const count = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ ...keyword })
   .limit(pageSize)
   .skip(pageSize * (page - 1));
  res.json({ products, page, pages: Math.ceil(count / pageSize) });
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

export const createProduct = asyncHandler(
 async (req: Request, res: Response) => {
  if (req.user) {
   const product = new Product({
    name: "Sample name",
    price: 0,
    description: "Sample description",
    brand: "Sample brand",
    category: "Sample category",
    countInStock: 0,
    image: "src/images/sample.jpg",
    user: req.user._id,
    numReviews: 0,
   });
   const createdProduct = await product.save();
   res.status(201).json(createdProduct);
  }
 }
);

export const updateProduct = asyncHandler(
 async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (product) {
   product.name = req.body.name || product.name;
   product.price = req.body.price || product.price;
   product.description = req.body.description || product.description;
   product.brand = req.body.brand || product.brand;
   product.category = req.body.category || product.category;
   product.countInStock = req.body.countInStock || product.countInStock;
   product.image = req.body.image || product.image;
   const updatedProduct = await product.save();
   return res.json(updatedProduct);
  }
  res.status(404);
  throw new Error("Product not found");
 }
);

export const deleteProduct = asyncHandler(
 async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (product) {
   await Product.deleteOne({ _id: id });
   return res.status(200).json({ message: "Product removed" });
  } else {
   res.status(404);
   throw new Error("Product not found");
  }
 }
);

export const createProductReview = asyncHandler(
 async (req: Request, res: Response) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);
  if (product) {
   const alreadyReviewed = product.reviews.find(
    (r) => r.user.toString() === req.user?._id.toString()
   );
   if (alreadyReviewed) {
    res.status(400);
    throw new Error("Product already reviewed");
   }
   if (req.user) {
    const review = {
     name: req.user.name,
     rating: Number(rating),
     comment,
     user: req.user._id,
    };
    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
     product.reviews.reduce((acc, item) => item.rating + acc, 0) /
     product.reviews.length;
    await product.save();
    return res.status(201).json({ message: "Review added" });
   } else {
    res.status(404);
    throw new Error("Not found");
   }
  }
 }
);

export const getTopProducts = asyncHandler(
 async (req: Request, res: Response) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);
  res.status(200).json(products);
 }
);
