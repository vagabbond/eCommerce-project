import { Schema, model } from "mongoose";

interface IReviews {
 user: Schema.Types.ObjectId;
 name: string;
 rating: number;
 comment: string;
}
interface IProduct {
 user: Schema.Types.ObjectId;
 name: string;
 image: string;
 description: string;
 brand: string;
 category: string;
 price: number;
 countInStock: number;
 rating: number;
 numReviews: number;
 reviews: IReviews[];
}

const reviewSchema = new Schema<IReviews>(
 {
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
 },
 { timestamps: true }
);

const productSchema = new Schema<IProduct>(
 {
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  brand: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  countInStock: { type: Number, required: true },
  rating: { type: Number, required: true, default: 0 },
  numReviews: { type: Number, required: true, default: 0 },
  reviews: [reviewSchema],
 },
 { timestamps: true }
);

export const Product = model<IProduct>("Product", productSchema);
