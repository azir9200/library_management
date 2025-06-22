"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookController = void 0;
const book_model_1 = __importDefault(require("./book.model"));
const mongoose_1 = require("mongoose");
const createBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield book_model_1.default.create(req.body);
        res.send({
            success: true,
            message: "Book Created Successfully",
            data,
        });
    }
    catch (error) {
        res.send({
            success: false,
            message: error.message,
            error,
        });
    }
});
const getBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { filter, sortBy = "createdAt", sort = "desc", limit = "10", } = req.query;
        const query = {};
        if (filter) {
            query.genre = filter;
        }
        const sortOrder = sort === "asc" ? 1 : -1;
        const data = yield book_model_1.default.find(query)
            .sort({ [sortBy]: sortOrder })
            .limit(parseInt(limit));
        res.send({
            success: true,
            message: "Books retrieved successfully",
            data,
        });
    }
    catch (error) {
        res.send({
            success: true,
            message: "Error",
            error,
        });
    }
});
const getBookById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const data = yield book_model_1.default.findById(bookId);
        if (!data) {
            throw new mongoose_1.Error("book not fount");
        }
        res.send({
            success: true,
            message: "Books retrieved successfully",
            data,
        });
    }
    catch (error) {
        res.send({
            success: false,
            message: "Error",
            error,
        });
    }
});
const updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const book = yield book_model_1.default.findById(bookId);
        console.log("book", book);
        if (!book) {
            throw new mongoose_1.Error("Book not found !");
        }
        const data = yield book_model_1.default.findByIdAndUpdate(bookId, req.body, {
            new: true,
            runValidators: true,
        });
        res.send({
            success: true,
            message: "Book updated Successfully",
            data,
        });
    }
    catch (error) {
        res.send({
            success: false,
            message: "Error",
            error,
        });
    }
});
const deleteBookById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.bookId;
    const data = yield book_model_1.default.findByIdAndDelete(bookId);
    res.send({
        success: true,
        message: "Book deleted Successfully",
        data: null,
    });
});
exports.bookController = {
    createBook,
    getBooks,
    getBookById,
    updateBook,
    deleteBookById,
};
