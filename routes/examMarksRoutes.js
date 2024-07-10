import express from "express";
import {
  getAllExamCountStatus,
  getAllExamMarks,
  getExamMarks,
  getExamMarksById,
  getStatusCountByCourseName,
  storeExamAnswers,
} from "../controller/examMarksController.js";

const router = express.Router();

// POST endpoint to store exam answers
router.post("/", storeExamAnswers);

// GET all exam marks of students by course name
router.get("/course/:courseName", getStatusCountByCourseName);

// GET route to fetch exam marks for a specific student and course
router.get("/:studentId/:courseName", getExamMarks);

// Get all conunts of all courses
router.get("/all_exam_status", getAllExamCountStatus);

// GET request to retrive all exam marks
router.get("/", getAllExamMarks);

// GET request to fetch exam marks by student ID
router.get("/:studentId", getExamMarksById);

export default router;
