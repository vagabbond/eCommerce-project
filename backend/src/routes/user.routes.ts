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
} from "../controllers/user.controler";
import { protect, admin } from "../middleware/auth.handler";

export const userRouter = Router();

userRouter.route("/").post(registerUser).get(protect, admin, getAllUsers);
userRouter.post("/logout", logoutUser);
userRouter.post("/login", authUser);
userRouter
 .route("/profile")
 .put(protect, updateUserProfile)
 .get(protect, getUserProfile);
userRouter
 .route("/:id")
 .delete(protect, admin, deleteUser)
 .get(protect, admin, getUserById)
 .put(protect, admin, updateUser);
