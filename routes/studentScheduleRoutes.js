import express from "express";
import {
  addStudentSchedule,
  deleteStudentSchedule,
  getAllStudentSchedules,
  updateStudentSchedule,
} from "../controller/studentScheduleController.js";

const router = express.Router();

// Routes for managing student schedules

// Get all student schedules
router.get("/", getAllStudentSchedules);

// Add a new student schedule
router.post("/", addStudentSchedule);

// Update a student schedule
router.put("/:id", updateStudentSchedule);

// Delete a student schedule
router.delete("/:id", deleteStudentSchedule);

export default router;
