import express from "express";
import {
  getAttendance,
  getAttendanceByStudentId,
  getAttendanceBySubject,
  handleAttendance,
} from "../controller/attendanceController.js";

const router = express.Router();

// Route for handling attendance submission
router.post("/", handleAttendance);

// Route for getting attendance records
router.get("/", getAttendance);

//Route for getting attendace record by subject
router.get("/teacher/:teacher", getAttendanceBySubject);

//Route for getting attendace by student ID
router.get("/:studentId", getAttendanceByStudentId);

export default router;
