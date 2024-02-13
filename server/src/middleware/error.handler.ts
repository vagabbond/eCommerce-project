import { Request, Response, NextFunction } from "express";

interface ICustomError extends Error {
 kind: string;
}

export const notFound = (req: Request, res: Response, next: NextFunction) => {
 const error = new Error(`Not found - ${req.originalUrl}`);
 res.status(404);
 next(error);
};

export const errorHandler = (
 error: ICustomError,
 req: Request,
 res: Response,
 next: NextFunction
) => {
 let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
 let message = error.message;
 if (error.name === "CastError" && error.kind === "ObjectId") {
  message = `Resourse not found`;
  statusCode = 404;
 }
 res.status(statusCode).json({ message, stack: error.stack });
};
