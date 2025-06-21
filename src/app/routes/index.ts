import { Router } from "express";
import borrowRoute from "../modules/borrow/borrow.route";
import bookRoute from "../modules/books/book.route";

const routes = Router();

routes.use("/books", bookRoute);
routes.use("/borrow", borrowRoute);

// const moduleRoutes = [
//   {
//     path: "/book",
//     route: bookRoutes,
//   },
// ];
// moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default routes;
