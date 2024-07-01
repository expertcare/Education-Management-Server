import express from "express";
import {
  createQuestion,
  deleteQuestion,
  deleteQuestionByCourse,
  getAllQuestions,
  getQuestionsByCourse,
  getQuestionsByFaculty,
  updateQuestion,
  uploadExcel,
} from "../controller/questionController.js";
import multer from "multer";

const router = express.Router();

// Create a new question
router.post("/", createQuestion);

// Get all questions
router.get("/", getAllQuestions);

// Update a question
router.patch("/:id", updateQuestion);

// Delete a question
router.delete("/:id", deleteQuestion);

//Delete questions by course name
router.delete("/:course", deleteQuestionByCourse);

//get course by course name
router.get("/:courseName", getQuestionsByCourse);

//get question by facluty name
router.get("/:facultyName", getQuestionsByFaculty);

// Multer configuration for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

//Post for uploading Excel file
router.post("/upload-excel", upload.single("file"), uploadExcel);

export default router;
