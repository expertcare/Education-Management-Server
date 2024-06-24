import express from "express";
import {
  createQuestion,
  deleteQuestion,
  getAllQuestions,
  getQuestionsByCourse,
  updateQuestion,
} from "../controller/questionController.js";

const router = express.Router();

// Create a new question
router.post("/", createQuestion);

// Get all questions
router.get("/", getAllQuestions);

// Update a question
router.patch("/:id", updateQuestion);

// Delete a question
router.delete("/:id", deleteQuestion);

router.get("/:courseName", getQuestionsByCourse);

export default router;
