import express from "express";
import {
  addTodoItem,
  deleteTodoItem,
  getAllTodoItems,
  getTodoItemById,
  updateTodoItem,
} from "../controller/todoController.js";

const router = express.Router();

router.get("/", getAllTodoItems);
router.get("/:id", getTodoItemById);
router.post("/", addTodoItem);
router.put("/:id", updateTodoItem);
router.delete("/:id", deleteTodoItem);

export default router;
