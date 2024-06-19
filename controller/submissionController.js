import Submission from "../models/submissionModel.js";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/"); // Save uploaded files to the "uploads" directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Rename file with current timestamp + original extension
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (path.extname(file.originalname) !== ".pdf") {
      return cb(new Error("Only PDF files are allowed"));
    }
    cb(null, true);
  },
}).single("file");

// Controller function to handle submission creation
export const createSubmission = async (req, res) => {
  try {
    upload(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading
        console.error("Multer error:", err);
        return res.status(500).json({ error: "File upload error" });
      } else if (err) {
        // An unknown error occurred
        console.error("Unknown error:", err);
        return res.status(500).json({ error: "Unknown error" });
      }

      // File upload successful, save submission details to database
      const { assignmentId, userName, userId } = req.body;
      const file = req.file.path; // Uploaded file path

      const newSubmission = new Submission({
        assignmentId,
        userName,
        userId,
        file,
      });

      await newSubmission.save();

      res.status(201).json({ message: "Submission successful!" });
    });
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
