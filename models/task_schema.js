import { Schema, model } from "mongoose";

const postSchema = new Schema({
  email: {
    type: String,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    ref: "User",
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
});

const Task = model("Task", postSchema);

export default Task;
