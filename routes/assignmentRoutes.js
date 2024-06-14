import express from "express";
import {
  addAssignment,
  deleteAssignment,
  getAllAssignments,
  updateAssignment,
} from "../controller/assignmentController.js";

const router = express.Router();

// Routes for managing assignments

// Get all assignments
router.get("/", getAllAssignments);

// Add a new assignment
router.post("/", addAssignment);

// Update an existing assignment
router.put("/:id", updateAssignment);

// Delete an assignment
router.delete("/:id", deleteAssignment);

export default router;
