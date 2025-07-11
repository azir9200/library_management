import { Request, Response } from "express";
import Borrow from "./borrow.model";
import Book from "../books/book.model";

const createBorrow = async (req: Request, res: Response) => {
  const { book, quantity, dueDate } = req.body;

  try {
    const bookExist = await Book.findById(book);

    if (!bookExist) {
      throw new Error("Book not found !");
    }
    if (bookExist.copies < quantity) {
      throw new Error("Book not enough to borrow");
    }

    bookExist.copies = bookExist?.copies - quantity;

    if (bookExist?.copies == 0) {
      bookExist.available = false;
    }

    await bookExist.save();

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
    res.send({
      success: false,
      message: error.message as string,
      error,
    });
  }
};

const getBorrowBook = async (req: Request, res: Response) => {
  try {
    const data = await Borrow.aggregate([
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
