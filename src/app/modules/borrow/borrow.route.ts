import { Router } from "express";
import { borrowController } from "./borrow.controller";


const borrowRoute = Router();

borrowRoute.post("/", borrowController.createBorrow);
borrowRoute.get("/borrow-summary", borrowController.getBorrowBook);

export default borrowRoute;
