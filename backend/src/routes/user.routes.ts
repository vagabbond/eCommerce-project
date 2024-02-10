import { Router } from "express";

import {
 authUser,
 registerUser,
 logoutUser,
 updateUserProfile,
 getUserProfile,
 getAllUsers,
 getUserById,
 deleteUser,
 updateUser,
} from "../controllers/user.controller.js";
import { protect, admin } from "../middleware/auth.handler.js";

export const userRouter = Router();

userRouter.route("/").get(protect, admin, getAllUsers);
userRouter.post("/logout", logoutUser);
userRouter.post("/login", authUser);
userRouter.post("/register", registerUser);
userRouter
 .route("/profile")
 .put(protect, updateUserProfile)
 .get(protect, getUserProfile);
userRouter
 .route("/:id")
 .delete(protect, admin, deleteUser)
 .get(protect, admin, getUserById)
 .put(protect, admin, updateUser);
