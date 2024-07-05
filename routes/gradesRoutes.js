// grades.routes.js

import express from "express";
import {
  addGrade,
  getAllGrades,
  getAssignmentGradedByFaculty,
} from "../controller/gradesController.js";

const router = express.Router();

// POST request to add a grade
router.post("/", addGrade);

//GET request to fetch grades by graded by faculty
router.get("/faculty/:faculty", getAssignmentGradedByFaculty);

// GET request to fetch grades by submissionId
router.get("/", getAllGrades);

export default router;
