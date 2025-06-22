import { Request, Response } from "express";
import Borrow from "./borrow.model";
import Book from "../books/book.model";

const createBorrow = async (req: Request, res: Response) => {
  const { book, quantity, dueDate } = req.body;
  console.log("body", req.body);
  try {
    const bookExist = await Book.findById(book);
    console.log("book", bookExist);
    if (!bookExist) {
      return res.status(404).json({
        success: false,
        message: "Book not found!",
      });
    }
    if (bookExist.copies < quantity) {
      return res.status(400).json({
        success: false,
        message: "Not enough copies available to borrow.",
      });
    }
    //   book.copies -= quantity;
    bookExist.copies = bookExist?.copies - quantity;

    if (bookExist?.copies === 0) {
      bookExist.available = false;
    }
    console.log("book", book);
    await bookExist.save();
    // const data = await Borrow.create(req.body);
    const data = await Borrow.create({
      book: book,
      quantity: quantity,
      dueDate: dueDate,
    });

    res.send({
      success: true,
      message: "Book Borrow Successfully",
      data,
    });
  } catch (error: any) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Validation failed",
        success: false,
        error,
      });
    }
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message || error,
    });
  }
};

export const getBorrowBook = async (req: Request, res: Response) => {
  try {
    const data = await Borrow.aggregate([
      {
        $group: {
          _id: "$book",
          totalQuantity: { $sum: "$quantity" },
        },
      },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "book",
        },
      },
      {
        $unwind: "$book",
      },
      {
        $project: {
          _id: 0,
          book: {
            title: "$book.title",
            isbn: "$book.isbn",
          },
          totalQuantity: 1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      message: "Borrowed books summary retrieved successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve borrowed books summary",
      error: error instanceof Error ? error.message : error,
    });
  }
};

export const borrowController = {
  createBorrow,
  getBorrowBook,
};
