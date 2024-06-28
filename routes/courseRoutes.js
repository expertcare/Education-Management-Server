import express from "express";
import {
  addCourse,
  deleteCourse,
  getAllCourses,
  getCourseByFacultyName,
  updateCourse,
} from "../controller/courseController.js";

const router = express.Router();

// Get all courses
router.get("/courses", getAllCourses);

//Get Courses by faculty ID
router.get("/courses/:faculty", getCourseByFacultyName);

// Add a new course
router.post("/courses", addCourse);

// Update a course
router.put("/courses/:id", updateCourse);

// Delete a course
router.delete("/courses/:id", deleteCourse);

export default router;
