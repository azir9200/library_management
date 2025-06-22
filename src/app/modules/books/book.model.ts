import { model, Schema } from "mongoose";
import { IBook } from "./book.interface";

const bookSchema = new Schema<IBook>(
  {
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
      ],
      required: true,
    },
    isbn: { type: Number, min: 0, required: true },
    copies: { type: Number, min: 0, required: true },
    description: { type: String },
    available: { type: Boolean, required: true },
  },
  { timestamps: true }
);


const Book = model<IBook>("Book", bookSchema);

export default Book;
