"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const borrow_route_1 = __importDefault(require("../modules/borrow/borrow.route"));
const book_route_1 = __importDefault(require("../modules/books/book.route"));
const routes = (0, express_1.Router)();
routes.use("/books", book_route_1.default);
routes.use("/borrow", borrow_route_1.default);
exports.default = routes;
