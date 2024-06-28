import express from "express";
import {
  createSubmission,
  getSubmissions,
  getUserSubmissions,
} from "../controller/submissionController.js";

const router = express.Router();

// Route to handle fetching all submissions
router.get("/", getSubmissions);

//Route to handle fetching logged in user submissions
router.get("/:userId", getUserSubmissions);

// Route to handle submission creation
router.post("/", createSubmission);

export default router;
