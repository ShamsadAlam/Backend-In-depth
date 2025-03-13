import mongoose from "mongoose";
import { User } from "./user.model";

const todoScehma = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    complete: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    subTodos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubTodo",
      },
    ], // Array of SubTodos
  },
  { timestamps: true }
);

export const Todo = mongoose.model("Todo", todoScehma);
