import { Router } from "express";
import borrowRoute from "../modules/borrow/borrow.route";
import bookRoute from "../modules/books/book.route";

const routes = Router();

routes.use("/books", bookRoute);
routes.use("/borrow", borrowRoute);


export default routes;
