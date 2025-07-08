"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bookSchema = new mongoose_1.Schema({
    title: { type: String, trim: true, required: true },
    author: { type: String, trim: true, required: true },
    genre: {
        type: String,
        enum: [
            "FICTION",
            "NON_FICTION",
            "SCIENCE",
            "HISTORY",
            "BIOGRAPHY",
            "FANTASY",
            "ROMANCE",
        ],
        required: true,
    },
    isbn: { type: Number, min: 0, required: true },
    copies: { type: Number, min: 0, required: true },
    image: { type: String, required: true },
    description: { type: String },
    available: { type: Boolean, required: true, default: true },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });
bookSchema.statics.findAvailable = function () {
    return this.find({ available: true });
};
const Book = (0, mongoose_1.model)("Book", bookSchema);
exports.default = Book;
