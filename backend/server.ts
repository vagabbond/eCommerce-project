import cors from "cors";
import express, { Express } from "express";
import dotenv from "dotenv";

import { connect } from "./src/config/db";
import { errorHandler, notFound } from "./src/middleware/error.handler";
import { productsRouter } from "./src/routes/product.routes";

dotenv.config();
const PORT = process.env.PORT || 5000;
const app: Express = express();

app.use(cors());

app.use("/api/products", productsRouter);
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
 connect();
 console.log(`Server is started on port ${PORT}`);
});
