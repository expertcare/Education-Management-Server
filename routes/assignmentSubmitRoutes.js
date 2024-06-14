// routes/assignmentRoutes.js

import express from "express";
import multer from "multer";
import File from "../models/File.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// POST route for file upload
router.post("/submissions/upload", upload.single("file"), async (req, res) => {
  try {
    const { originalname, mimetype, size } = req.file;
    const file = new File({
      filename: originalname,
      contentType: mimetype,
      size: size,
    });
    await file.save();
    res.status(201).send(file._id); // Respond with MongoDB document ID
  } catch (err) {
    console.error("Error uploading file:", err);
    res.status(500).send("Server Error");
  }
});

// GET route for fetching file
router.get("/submissions/:id/file", async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) {
      return res.status(404).send("File not found");
    }
    const filePath = `uploads/${file.filename}`; // Path to the file
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
  } catch (err) {
    console.error("Error fetching file:", err);
    res.status(500).send("Server Error");
  }
});
// Other assignment routes...
export default router;
