import { Router } from "express";
import { getAllProducts, getProduct } from "../controllers/product.controller";

export const productsRouter = Router();

productsRouter.route("/").get(getAllProducts);
productsRouter.route("/:id").get(getProduct);
