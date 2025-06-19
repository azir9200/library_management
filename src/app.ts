import express, { Application, Request, Response } from "express";
import cors from "cors";
import router from "./app/routes";
import {
  errorHandler,
  notFoundHandler,
} from "./app/middlewares/globalErrorHandler";

const app: Application = express();

const middleware = [
  cors(),
  express.json(),
  express.urlencoded({ extended: true }),
];
app.use(middleware);

app.use("/api/v1", router);
app.get("/", (req: Request, res: Response) => {
  res.send({ success: true, message: `Server is Live ⚡` });
  res.send("Welcome to server site !");
});

// 404 Not Found handler (must be after all routes)
app.use(notFoundHandler);

// Global Error handler (must be last)
app.use(errorHandler);

export default app;
