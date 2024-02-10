import { Router } from "express";

import {
 addOrderItems,
 getUserOrders,
 getOrderById,
 updateOrderToPaid,
 updateOrderToDelivered,
 getAllOrders,
} from "../controllers/order.controller";
import { protect, admin } from "../middleware/auth.handler";

export const orderRouter = Router();

orderRouter
 .route("/")
 .post(protect, addOrderItems)
 .get(protect, admin, getAllOrders);
orderRouter.route("/mine").get(protect, getUserOrders);
orderRouter.route("/:id").get(protect, getOrderById);
orderRouter.route("/:id/pay").put(protect, updateOrderToPaid);
orderRouter.route("/:id/deliver").put(protect, admin, updateOrderToDelivered);
