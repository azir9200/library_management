import { Request, Response } from "express";
import Borrow from "./borrow.model";
import Book from "../books/book.model";

const createBorrow = async (req: Request, res: Response) => {
  const { bookId, quantity, dueDate } = req.body;
  console.log("body", req.body);
  try {
    const book = await Book.findById(bookId);
    console.log("book", book);
    if (!book) {
      throw new Error("Book not found !");
    }
    if (book.copies < quantity) {
      throw new Error("Book not enough to borrow");
    }
    //   book.copies -= quantity;
    book.copies = book?.copies - quantity;

    if (book?.copies == 0) {
      book.available = false;
    }
    console.log("book", book);
    await book.save();
    // const data = await Borrow.create(req.body);
    const data = await Borrow.create({
      book: bookId,
      quantity: quantity,
      dueDate: dueDate,
    });

    console.log("data", data);
    console.log("borrow cont", req.body);

    res.send({
      success: true,
      message: "Book Borrow Successfully",
      data,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message as string,
      error,
    });
  }
};

const getBorrowBook = async (req: Request, res: Response) => {
  try {
    const data = await Borrow.find();
    console.log("data", data);

    res.send({
      success: true,
      message: "Borrowed books summary retrieved successfully",
      data,
    });
  } catch (error) {
    res.send({
      success: true,
      message: "Error",
      error,
    });
  }
};

export const borrowController = {
  createBorrow,
  getBorrowBook,
};
