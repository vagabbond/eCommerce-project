import { Order } from "../models/orders.molel.js";
import asyncHandler from "../middleware/async.handler.js";
import { Request, Response } from "express";

interface IReviews {
 user: string;
 name: string;
 rating: number;
 comment: string;
}
interface IOrderItem {
 _id: string;
 user: string;
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
 qty: number;
}
export const addOrderItems = asyncHandler(
 async (req: Request, res: Response) => {
  const {
   orderItems,
   shippingAddress,
   paymentMethod,
   itemsPrice,
   shippingPrice,
   taxPrice,
   totalPrice,
  } = req.body;

  if (orderItems && orderItems.length !== 0 && req.user) {
   const order = new Order({
    orderItems: orderItems.map((item: IOrderItem) => ({
     name: item.name,
     qty: item.qty,
     image: item.image,
     price: item.price,
     product: item._id,
     _id: undefined,
    })),
    user: req.user._id,
    shippingAddress: { ...shippingAddress },
    paymentMethod,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
   });
   const createdOrder = await order.save();
   console.log(createdOrder);
   res.status(201).json(createdOrder);
  } else {
   res.status(400);
   throw new Error("No order items");
  }
 }
);

export const getUserOrders = asyncHandler(
 async (req: Request, res: Response) => {
  const orders = await Order.find({ user: req.user?._id });
  res.status(201).json(orders);
 }
);

export const getOrderById = asyncHandler(
 async (req: Request, res: Response) => {
  const order = await Order.findById(req.params.id).populate(
   "user",
   "name email"
  );
  if (order) {
   res.status(200).json(order);
  } else {
   res.status(404);
   throw new Error("Order not found");
  }
 }
);

export const updateOrderToPaid = asyncHandler(
 async (req: Request, res: Response) => {
  const order = await Order.findById(req.params.id);
  if (order) {
   order.isPaid = true;
   order.paidAt = new Date(Date.now());
   order.paymentResult = {
    id: req.params.id,
    status: req.params.status,
    updateTime: req.params.update_time,
    emailAddress: req.params.email_address,
   };
   const updatedOrder = await order.save();
   res.status(200).json(updatedOrder);
  } else {
   res.status(404);
   throw new Error("Order not found ");
  }
 }
);

export const updateOrderToDelivered = asyncHandler(
 async (req: Request, res: Response) => {
  const order = await Order.findById(req.params.id);
  if (order) {
   order.isDelivered = true;
   order.deliveredAt = new Date(Date.now());
   const updatedOrder = await order.save();
   res.status(200).json(updatedOrder);
  } else {
   res.status(404);
   throw new Error("Order not found");
  }
 }
);

export const getAllOrders = asyncHandler(
 async (req: Request, res: Response) => {
  const page = Number(req.query.pageNumber) || 1;
  const pageSize = 3;
  const count = await Order.countDocuments();

  const orders = await Order.find({})
   .populate("user", "id name")
   .limit(pageSize)
   .skip(pageSize * (page - 1));
  res.status(200).json({ orders, page, pages: Math.ceil(count / pageSize) });
 }
);
