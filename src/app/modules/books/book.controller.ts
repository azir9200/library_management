import { Request, Response } from "express";
import Book from "./book.model";
import mongoose from "mongoose";

const createBook = async (req: Request, res: Response) => {
  try {
    const data = await Book.create(req.body);
    console.log("book cont", req.body);

    res.send({
      success: true,
      message: "Mango Created Successfully",
      data,
    });
  } catch (error) {
    res.send({
      success: false,
      message: "Error Happened",
      error,
    });
  }
};

const getBooks = async (req: Request, res: Response) => {
  try {
    const data = await Book.find();
    res.send({
      success: true,
      message: "Book getting Successfully",
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

// const getBookById = async (req: Request, res: Response) => {
//   try {
//     const bookId = req.params.id;
//     console.log("Book ID:", bookId);

//     if (!mongoose.Types.ObjectId.isValid(bookId)) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid book ID format",
//       });
//     }

//     const data = await Book.findById(bookId);
//     console.log("Book Data:", data);

//     if (!data) {
//       return res.status(404).json({
//         success: false,
//         message: "Book not found",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Book retrieved successfully",
//       data,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Server error",
//       error: error instanceof Error ? error.message : error,
//     });
//   }
// };

const getBookById = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
    console.log("paga", req.params);
    console.log("isssd", bookId);
    const data = await Book.findById(bookId);
    console.log("data bok", data);
    res.send({
      success: true,
      message: "Book getting Successfully",
      data,
    });
  } catch (error) {
    res.send({
      success: false,
      message: "Error",
      error,
    });
  }
};

const updateBook = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;

    const data = await Book.findByIdAndUpdate(bookId, req.body, {
      new: true,
      runValidators: true,
    });
    res.send({
      success: true,
      message: "Book updated Successfully",
      data,
    });
  } catch (error) {
    res.send({
      success: false,
      message: "Error",
      error,
    });
  }
};

const deleteBookById = async (req: Request, res: Response) => {
  const bookId = req.params.bookId;

  const data = await Book.findByIdAndDelete(bookId);
  res.send({
    success: true,
    message: "Book deleted Successfully",
    data,
  });
};

export const bookController = {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBookById,
};
