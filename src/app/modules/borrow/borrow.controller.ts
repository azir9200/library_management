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
  } catch (error: any) {
    res.send({
      success: false,
      message: error.message as string,
      error,
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
          totalQuantity: 1,
          book: {
            title: "$book.title",
            isbn: "$book.isbn",
          },
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

// const getBorrowBook = async (req: Request, res: Response) => {
//   try {
//     const data = await Borrow.find();

//     res.send({
//       success: true,
//       message: "Borrowed books summary retrieved successfully",
//       data,
//     });
//   } catch (error) {
//     res.send({
//       success: true,
//       message: "Error",
//       error,
//     });
//   }
// };

export const borrowController = {
  createBorrow,
  getBorrowBook,
};
