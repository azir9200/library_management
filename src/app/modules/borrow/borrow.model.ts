import mongoose, { model, Schema } from "mongoose";
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
      required: [true, "Quantity is required"],
      min: [1, "Quantity must be at least 1"],
      validate: {
        validator: Number.isInteger,
        message: "Quantity must be an integer",
      },
    },
    dueDate: {
      type: Date,
      required: [true, "Due date is required"],
    },
  },
  { timestamps: true }
);

const Borrow = model<IBorrow>("IBorrow", borrowSchema);

export default Borrow;
