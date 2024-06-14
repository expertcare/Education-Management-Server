import express from "express";
import {
  createSubmission,
  getSubmissions,
} from "../controller/submissionController.js";

const router = express.Router();

// Route to handle fetching all submissions
router.get("/", getSubmissions);

// Route to handle submission creation
router.post("/", createSubmission);

export default router;
