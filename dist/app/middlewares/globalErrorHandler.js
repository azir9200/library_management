"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.notFoundHandler = void 0;
const notFoundHandler = (req, res, next) => {
    res.status(404).json({
        success: false,
        message: `🔍Api Not Found: ${req.originalUrl}`,
    });
};
exports.notFoundHandler = notFoundHandler;
//Global Error Handler
const errorHandler = (err, req, res, next) => {
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
exports.errorHandler = errorHandler;
