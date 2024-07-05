import express from "express";
import {
  addAssignment,
  deleteAssignment,
  getAllAssignments,
  updateAssignment,
  getAssignmentByCourse,
  getAssignmentByFaculty,
} from "../controller/assignmentController.js";

const router = express.Router();

// Routes for managing assignments

// Get all assignments
router.get("/", getAllAssignments);

//get assign by faculty name
router.get("/faculty/:userId", getAssignmentByFaculty);

//Get assignment by course name
router.get("/:courseName", getAssignmentByCourse);

// Add a new assignment
router.post("/", addAssignment);

// Update an existing assignment
router.put("/:id", updateAssignment);

// Delete an assignment
router.delete("/:id", deleteAssignment);

export default router;
