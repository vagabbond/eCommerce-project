import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

import products from "../frontend/src/products";

dotenv.config();
const PORT = process.env.PORT || 5000;
const app: Express = express();

app.use(function (req, res, next) {
 res.header("Access-Control-Allow-Origin", "http://localhost:5173");
 res.header(
  "Access-Control-Allow-Headers",
  "Origin, X-Requested-With, Content-Type, Accept"
 );
 next();
});

app.get("/", (req: Request, res: Response) => {
 res.send("start").status(200);
});

app.get("/api/products", (req: Request, res: Response) => {
 res.json(products);
});
app.get("/api/products/:id", (req: Request, res: Response) => {
 const product = products.find((p) => p._id === req.params.id);
 res.json(product);
});
app.listen(PORT, () => {
 console.log(`Server is start on port ${PORT}`);
});
