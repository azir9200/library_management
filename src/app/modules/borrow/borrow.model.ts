import mongoose, { model, now, Schema } from "mongoose";
import { IBorrow } from "./borrow.interface";

const borrowSchema = new Schema<IBorrow>(
  {
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      trim: true,
      required: true,
    },
    quantity: {
      type: Number,
      trim: true,
      required: true,
    
      min: [0, "Quantity must be in positive number "],
    },
    dueDate: { type: Date, required: true },
  },
  { timestamps: true }
);
const Borrow = model<IBorrow>("IBorrow", borrowSchema);

export default Borrow;
