import express from "express";
import {
  getAllExamMarks,
  getExamMarks,
  storeExamAnswers,
} from "../controller/examMarksController.js";

const router = express.Router();

// POST endpoint to store exam answers
router.post("/", storeExamAnswers);

// GET route to fetch exam marks for a specific student and course
router.get("/:studentId/:courseName", getExamMarks);

// GET request to retrive all exam marks
router.get("/", getAllExamMarks);

export default router;
