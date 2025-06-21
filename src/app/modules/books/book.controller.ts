import { Request, Response } from "express";
import Book from "./book.model";
import mongoose from "mongoose";

const createBook = async (req: Request, res: Response) => {
  try {
    const data = await Book.create(req.body);
    console.log("book cont", req.body);

    res.send({
      success: true,
      message: "Book Created Successfully",
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
    const bookId = req.params.bookId;
    
    const data = await Book.findById(bookId);
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
    data: null,
  });
};

export const bookController = {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBookById,
};
