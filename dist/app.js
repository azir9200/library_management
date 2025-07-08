"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const globalErrorHandler_1 = require("./app/middlewares/globalErrorHandler");
const routes_1 = __importDefault(require("./app/routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: [
        "https://library-manage-front.vercel.app",
        "http://localhost:5173",
    ],
    credentials: true,
}));
app.use("/api", routes_1.default);
app.get("/", (req, res) => {
    res.send({ success: true, message: `Server is Live ⚡` });
});
// Found handler
app.use(globalErrorHandler_1.notFoundHandler);
// Global Error handler
app.use(globalErrorHandler_1.errorHandler);
exports.default = app;
