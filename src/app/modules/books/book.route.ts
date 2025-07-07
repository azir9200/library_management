import { Router } from "express";
import { bookController } from "./book.controller";

const bookRoute = Router();

bookRoute.post("/create-book", bookController.createBook);
bookRoute.get("/", bookController.getBooks);
bookRoute.get("/:id", bookController.getBookById);
bookRoute.patch("/edit-book/:id", bookController.updateBook);

bookRoute.delete("/delete/:id", bookController.deleteBookById);

export default bookRoute;
