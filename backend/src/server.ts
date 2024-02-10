import cors from "cors";
import path from "path";
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";

import { connect } from "./config/db.js";
import { errorHandler, notFound } from "./middleware/error.handler.js";
import { productsRouter } from "./routes/product.routes.js";
import { userRouter } from "./routes/user.routes.js";
import { orderRouter } from "./routes/order.routes.js";
import { uploadRouter } from "./routes/upload.routes.js";

const __filename = fileURLToPath(import.meta?.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const PORT = process.env.PORT || 5000;
const app: Express = express();
const corsOptions = {
 origin: true,
 credentials: true,
};

app.use(express.static(path.join(__dirname, "../../frontend/dist")));
app.use("/uploads", express.static(path.join(__dirname, "../../uploads")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(cookieParser());

app.get("/api/config/paypal", (req: Request, res: Response) =>
 res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);
app.use("/api/uploads", uploadRouter);
app.use("/api/orders", orderRouter);
app.use("/api/products", productsRouter);
app.use("/api/users", userRouter);
app.use(notFound);
app.use(errorHandler);

if (process.env.NODE_ENV === "production") {
 console.log("Production mode");
 app.get("*", (req, res) =>
  res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"))
 );
} else {
 app.get("/", (req: Request, res: Response) => {
  console.log("Getting files");
  res.send("API is running....");
 });
}

app.listen(PORT, async () => {
 await connect();
 console.log(`Server is started on port ${PORT}`);
});
