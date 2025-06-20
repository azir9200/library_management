import { Router } from "express";
import bookRoute from "../modules/books/book.route";

const routes = Router();

routes.use("/book", bookRoute);

// const moduleRoutes = [
//   {
//     path: "/book",
//     route: bookRoutes,
//   },
// ];
// moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default routes;
