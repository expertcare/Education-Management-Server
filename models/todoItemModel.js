import mongoose from "mongoose";

const todoItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  id: {
    type: String, // Assuming frontend expects id as a string
    required: true,
    unique: true,
  },
});

const TodoItem = mongoose.model("TodoItem", todoItemSchema);

export default TodoItem;
