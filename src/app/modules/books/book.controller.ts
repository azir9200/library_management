import { Request, Response } from "express";
import Book from "./book.model";
import { error } from "console";
import { Error } from "mongoose";

const createBook = async (req: Request, res: Response) => {
  try {
    const data = await Book.create(req.body);

    res.send({
      success: true,
      message: "Book Created Successfully",
      data,
    });
  } catch (error: any) {
    res.send({
      success: false,
      message: error.message,
      error,
    });
  }
};

const getBooks = async (req: Request, res: Response) => {
  try {
    const {
      filter,
      sortBy = "createdAt",
      sort = "desc",
      limit = "10",
    } = req.query;

    const query: any = {};
    if (filter) {
      query.genre = filter;
    }

    const sortOrder = sort === "asc" ? 1 : -1;
    const data = await Book.find(query)
      .sort({ [sortBy as string]: sortOrder })
      .limit(parseInt(limit as string));
    res.send({
      success: true,
      message: "Books retrieved successfully",
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

const getBookById = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.id;

    const data = await Book.findById(bookId);

    if (!data) {
      throw new Error("book not fount");
    }
    res.send({
      success: true,
      message: "Books retrieved successfully",
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
    const bookId = req.params.id;
    console.log(req.params);
    const book = await Book.findById(bookId);
    console.log("book", book);
    if (!book) {
      throw new Error("Book not found !");
    }
    const data = await Book.findByIdAndUpdate(bookId, req.body, {
      new: true,
      runValidators: true,
    });
    res.send({
      success: true,
      message: "Book updated Successfully",
      data,
    });
  } catch (error: any) {
    res.send({
      success: false,
      message: error.message,
      error,
    });
  }
};

const deleteBookById = async (req: Request, res: Response) => {
  const bookId = req.params.bookId;

  try {
    const updatedBook = await Book.findByIdAndUpdate(
      bookId,
      { isDeleted: true },
      { new: true }
    );

    res.send({
      success: true,
      message: "Book  deleted successfully",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};

export const bookController = {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBookById,
};
