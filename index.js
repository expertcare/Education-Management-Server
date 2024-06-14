import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import courseRoutes from "./routes/courseRoutes.js";
import userDataRoutes from "./routes/userDataRoutes.js";
import studentScheduleRoutes from "./routes/studentScheduleRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import assignmentRoutes from "./routes/assignmentRoutes.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";
import submissionRoutes from "./routes/submissionRoutes.js";

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const URL = process.env.MONGODB_URI;

// Middleware my changes ----abhi
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      // "https://education-management-app-react-atharv.vercel.app",
    ],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
); // Enable CORS
app.use(express.json()); // Parse JSON bodies
mongoose
  .connect(URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// // Middleware
// app.use(express.json()); // Parse JSON bodies
// app.use(cors()); // Enable CORS

// Routes
app.use("/api/", courseRoutes);
app.use("/api/usersData", userDataRoutes);
app.use("/api/student_schedule", studentScheduleRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/assignments", assignmentRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/submissions", submissionRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
