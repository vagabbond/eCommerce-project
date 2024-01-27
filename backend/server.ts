import cors from "cors";
import express, { Express } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import { connect } from "./src/config/db";
import { errorHandler, notFound } from "./src/middleware/error.handler";
import { productsRouter } from "./src/routes/product.routes";
import { userRouter } from "./src/routes/user.routes";
dotenv.config();
const PORT = process.env.PORT || 5000;
const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

app.use("/api/products", productsRouter);
app.use("/api/users", userRouter);
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
 connect();
 console.log(`Server is started on port ${PORT}`);
});
