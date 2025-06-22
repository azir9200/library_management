import {
  ErrorRequestHandler,
  NextFunction,
  Request,
  RequestHandler,
  Response,
} from "express";

export const notFoundHandler: RequestHandler = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: `🔍Api Not Found: ${req.originalUrl}`,
  });
};

//Global Error Handler
export const errorHandler: ErrorRequestHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 400;

  const errorResponse = {
    message: "Validation failed",
    success: false,
    error: err,
    next,
  };

  // Other errors
  res.status(500).json({
    message: "Internal server error",
    success: false,
    error: err.message || err,
  });
};
