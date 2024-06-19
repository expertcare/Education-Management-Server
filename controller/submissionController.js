import multer from "multer";
import cloudinary from "../utils/cloudinary.js";
import Submission from "../models/submissionModel.js";

// Multer configuration for file upload
const upload = multer({
  storage: multer.diskStorage({}), // No longer needed to store locally
  fileFilter: function (req, file, cb) {
    const allowedTypes = ["image/png", "image/jpeg", "application/pdf"];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error("Only PDF, PNG, and JPG files are allowed"));
    }
    cb(null, true);
  },
}).single("file");

// Controller function to handle submission creation
export const createSubmission = async (req, res) => {
  try {
    upload(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        console.error("Multer error:", err);
        return res.status(500).json({ error: "File upload error" });
      } else if (err) {
        console.error("Unknown error:", err);
        return res.status(500).json({ error: "Unknown error" });
      }

      // File upload to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      // Save submission details to database
      const { assignmentId, userName, userId } = req.body;
      const fileUrl = result.secure_url; // Uploaded file URL from Cloudinary
      const submissionDate = new Date(); // Current date and time

      const newSubmission = new Submission({
        assignmentId,
        userName,
        userId,
        fileUrl,
        submissionDate, // Add current submission date
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
