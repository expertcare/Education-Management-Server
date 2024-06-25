import mongoose from "mongoose";

const ExamMarksSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: true,
  },
  marks: {
    type: Number,
    required: true,
  },
  percentage: {
    type: Number,
    required: true,
  },
  answers: {
    type: Object,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  studentId: {
    type: String,
    required: true,
  },
});

const ExamMarks = mongoose.model("ExamMarks", ExamMarksSchema);

export default ExamMarks;
