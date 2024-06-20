import TodoItem from "../models/todoItemModel.js";

// GET all todo items
export const getAllTodoItems = async (req, res) => {
  try {
    const todoItems = await TodoItem.find();
    res.json(todoItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET one todo item by id
export const getTodoItemById = async (req, res) => {
  const { id } = req.params;
  try {
    const todoItem = await TodoItem.findById(id);
    if (!todoItem) {
      return res.status(404).json({ message: "Todo item not found" });
    }
    res.json(todoItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST a new todo item
export const addTodoItem = async (req, res) => {
  const { name, dueDate } = req.body;
  try {
    const newTodoItem = new TodoItem({ name, dueDate });
    newTodoItem.id = newTodoItem._id.toString(); // Convert _id to string and assign to id field
    const savedTodoItem = await newTodoItem.save();
    res.status(201).json(savedTodoItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// PUT update a todo item
export const updateTodoItem = async (req, res) => {
  const { id } = req.params;
  const { name, dueDate } = req.body;
  try {
    const updatedTodoItem = await TodoItem.findByIdAndUpdate(
      id,
      { name, dueDate },
      { new: true }
    );
    if (!updatedTodoItem) {
      return res.status(404).json({ message: "Todo item not found" });
    }
    res.json(updatedTodoItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE a todo item
export const deleteTodoItem = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTodoItem = await TodoItem.findByIdAndDelete(id);
    if (!deletedTodoItem) {
      return res.status(404).json({ message: "Todo item not found" });
    }
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
