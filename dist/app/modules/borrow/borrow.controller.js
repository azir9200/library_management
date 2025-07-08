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
exports.borrowController = void 0;
const borrow_model_1 = __importDefault(require("./borrow.model"));
const book_model_1 = __importDefault(require("../books/book.model"));
const createBorrow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { book, quantity, dueDate } = req.body;
    try {
        const bookExist = yield book_model_1.default.findById(book);
        if (!bookExist) {
            throw new Error("Book not found !");
        }
        if (bookExist.copies < quantity) {
            throw new Error("Book not enough to borrow");
        }
        bookExist.copies = (bookExist === null || bookExist === void 0 ? void 0 : bookExist.copies) - quantity;
        if ((bookExist === null || bookExist === void 0 ? void 0 : bookExist.copies) == 0) {
            bookExist.available = false;
        }
        yield bookExist.save();
        const data = yield borrow_model_1.default.create({
            book: book,
            quantity: quantity,
            dueDate: dueDate,
        });
        res.send({
            success: true,
            message: "Book Borrow Successfully",
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
const getBorrowBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield borrow_model_1.default.aggregate([
            {
                $group: {
                    _id: "$book",
                    totalBorrowed: { $sum: "$quantity" },
                },
            },
            {
                $lookup: {
                    from: "books",
                    localField: "_id",
                    foreignField: "_id",
                    as: "bookDetails",
                },
            },
            {
                $unwind: "$bookDetails",
            },
            {
                $project: {
                    _id: 0,
                    title: "$bookDetails.title",
                    isbn: "$bookDetails.isbn",
                    totalBorrowed: 1,
                },
            },
        ]);
        console.log("object summery", data);
        // ......
        res.send({
            success: true,
            message: "Borrowed books summary retrieved successfully",
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
exports.borrowController = {
    createBorrow,
    getBorrowBook,
};
