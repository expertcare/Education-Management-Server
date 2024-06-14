import Submission from "../models/submissionModel.js";

// Controller function to handle submission creation
export const createSubmission = async (req, res) => {
  try {
    const submission = req.body;

    const newSubmission = new Submission(submission);

    await newSubmission.save();

    res.status(201).json({ message: "Submission successful!" });
  } catch (error) {
    console.error("Error submitting assignment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Controller function to handle fetching all submissions
export const getSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find();
    res.json(submissions);
  } catch (error) {
    console.error("Error fetching submissions:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
