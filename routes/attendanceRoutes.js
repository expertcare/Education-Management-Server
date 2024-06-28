import express from "express";
import {
  getAttendance,
  getAttendanceByStudentId,
  handleAttendance,
} from "../controller/attendanceController.js";

const router = express.Router();

// Route for handling attendance submission
router.post("/", handleAttendance);

// Route for getting attendance records
router.get("/", getAttendance);

//Route for getting attendace by student ID
router.get("/:studentId", getAttendanceByStudentId);

export default router;
