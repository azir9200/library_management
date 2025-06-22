import express, { Request, Response } from "express";
import cors from "cors";

import {
  errorHandler,
  notFoundHandler,
} from "./app/middlewares/globalErrorHandler";
import routes from "./app/routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", routes);

app.get("/", (req: Request, res: Response) => {
  res.send({ success: true, message: `Server is Live ⚡` });
});

// Found handler
app.use(notFoundHandler);

// Global Error handler
app.use(errorHandler);

export default app;
