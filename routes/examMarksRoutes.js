import express from "express";
import {
  getAllExamMarks,
  getExamMarks,
  getExamMarksById,
  storeExamAnswers,
} from "../controller/examMarksController.js";

const router = express.Router();

// POST endpoint to store exam answers
router.post("/", storeExamAnswers);

// GET route to fetch exam marks for a specific student and course
router.get("/:studentId/:courseName", getExamMarks);

// GET request to retrive all exam marks
router.get("/", getAllExamMarks);

// GET request to fetch exam marks by student ID
router.get("/:studentId", getExamMarksById);

export default router;
