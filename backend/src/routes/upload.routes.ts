import path from "path";
import { Router } from "express";
import multer, { FileFilterCallback } from "multer";
import { protect, admin } from "../middleware/auth.handler.js";

export const uploadRouter = Router();

const storage = multer.diskStorage({
 destination(req, file, cb) {
  cb(null, "../uploads/");
 },
 filename(req, file, cb) {
  cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
 },
});

const fileFilter = (
 req: Express.Request,
 file: Express.Multer.File,
 cb: FileFilterCallback
) => {
 const filetypes = /jpg|jpeg|png/;
 const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
 const mimetype = filetypes.test(file.mimetype);
 if (extname && mimetype) {
  return cb(null, true);
 }
 cb(null, false);
};

const upload = multer({
 storage,
 fileFilter,
});

uploadRouter.post("/", protect, admin, upload.single("image"), (req, res) => {
 if (req.file) {
  res.send({
   image: `${req.file.path.replace(/\\/g, "/")}`,
   message: "Image uploaded",
  });
 }
});
