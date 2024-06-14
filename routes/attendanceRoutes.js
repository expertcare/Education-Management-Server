import express from "express";
import {
  getAttendance,
  handleAttendance,
} from "../controller/attendanceController.js";

const router = express.Router();

// Route for handling attendance submission
router.post("/", handleAttendance);

// Route for getting attendance records
router.get("/", getAttendance);

export default router;
