// grades.routes.js

import express from "express";
import { addGrade, getAllGrades } from "../controller/gradesController.js";

const router = express.Router();

// POST request to add a grade
router.post("/", addGrade);

// GET request to fetch grades by submissionId
router.get("/", getAllGrades);

export default router;
