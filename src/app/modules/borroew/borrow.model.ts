import { Schema } from "mongoose";
import { IBorrow } from "./borrow.interface";

const borrowSchema = new Schema<IBorrow>({

      book: {String, trim: true, required: true},
  quantity: {type:Number, trim: true, required: true},
  dueDate: {type: Boolean, required: true};
})