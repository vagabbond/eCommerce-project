import { Router } from "express";
import {
 getAllProducts,
 getProduct,
 createProduct,
 updateProduct,
 deleteProduct,
 createProductReview,
 getTopProducts,
} from "../controllers/product.controller.js";
import { admin, protect } from "../middleware/auth.handler.js";

export const productsRouter = Router();

productsRouter
 .route("/")
 .get(getAllProducts)
 .post(protect, admin, createProduct);
productsRouter.route("/top").get(getTopProducts);
productsRouter
 .route("/:id")
 .get(getProduct)
 .put(protect, admin, updateProduct)
 .delete(protect, admin, deleteProduct);
productsRouter.route("/:id/reviews").post(protect, createProductReview);
