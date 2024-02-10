import { Schema, model } from "mongoose";

export interface IOrderItem {
 name: string;
 qty: string;
 image: string;
 price: string;
 product: Schema.Types.ObjectId;
}
interface IOrder {
 user: Schema.Types.ObjectId;
 orderItems: IOrderItem[];
 shippingAddress: {
  address: string;
  city: string;
  postalCode: string;
  country: string;
 };
 paymentMethod: string;
 paymentResult: {
  id: string;
  status: string;
  updateTime: string;
  emailAddress: string;
 };
 itemsPrice: number;
 taxPrice: number;
 shippingPrice: number;
 totalPrice: number;
 isPaid: boolean;
 paidAt: Date;
 isDelivered: boolean;
 deliveredAt: Date;
}

const orderSchema = new Schema<IOrder>(
 {
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  orderItems: [
   {
    name: { type: String, require: true },
    qty: { type: String, require: true },
    image: { type: String, require: true },
    price: { type: String, require: true },
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
   },
  ],
  shippingAddress: {
   address: { type: String, require: true },
   city: { type: String, require: true },
   postalCode: { type: String, require: true },
   country: { type: String, require: true },
  },
  paymentMethod: { type: String, require: true },
  paymentResult: {
   id: { type: String },
   status: { type: String },
   updateTime: { type: String },
   emailAddress: { type: String },
  },
  itemsPrice: { type: Number, require: true, default: 0.0 },
  taxPrice: { type: Number, require: true, default: 0.0 },
  shippingPrice: { type: Number, require: true, default: 0.0 },
  totalPrice: { type: Number, require: true, default: 0.0 },
  isPaid: { type: Boolean, require: true, default: false },
  paidAt: { type: Date },
  isDelivered: { type: Boolean, require: true, default: false },
  deliveredAt: { type: Date },
 },
 { timestamps: true }
);

export const Order = model<IOrder>("Order", orderSchema);
