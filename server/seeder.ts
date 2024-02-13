import mongoose from "mongoose";
import dotenv from "dotenv";
import users from "./src/data/user";
import products from "./src/data/products";
import { User } from "./src/models/user.model";
import { Product } from "./src/models/poducts.model";
import { Order } from "./src/models/orders.molel";
import { connect } from "./src/config/db";

dotenv.config();

const importData = async () => {
 try {
  await Order.deleteMany();
  await Product.deleteMany();
  await User.deleteMany();

  const createdUsers = await User.insertMany(users);

  const adminUser = createdUsers[0]._id;

  const sampleProducts = products.map((product) => {
   return { ...product, user: adminUser };
  });

  await Product.insertMany(sampleProducts);

  console.log("Data Imported!");
  process.exit();
 } catch (error) {
  console.error(`${error}`);
  process.exit(1);
 }
};

const destroyData = async () => {
 try {
  await Order.deleteMany();
  await Product.deleteMany();
  await User.deleteMany();

  console.log("Data Destroyed!");
  process.exit();
 } catch (error) {
  console.error(`${error}`);
  process.exit(1);
 }
};

const run = () => {
 connect();
 if (process.argv[2] === "-d") {
  destroyData();
 } else {
  importData();
 }
};

run();
