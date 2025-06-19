import cors from "cors";
import express, { Application, Request, Response } from "express";
import config from "./app/config";
import mongoose from "mongoose";
const app: Application = express();

app.use(cors());

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!, Library Management Server is connected to database");
});

async function main() {
  try {
    await mongoose.connect(config.database_url!);

    app.listen(config.port, () => {
      console.log(`✅ Server running on port ${config.port}`);
    });

    console.log(`Library Management Server is connected to database `);
  } catch (error) {
    console.error(`Server error ${error}`);
  }
}

main();

// export default app;
