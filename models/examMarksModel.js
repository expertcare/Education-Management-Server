// models/examMarksModel.js

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
  passFailStatus: {
    type: String,
    required: true,
    enum: ["Pass", "Fail"],
  },
  grade: {
    type: String,
    required: true,
    enum: ["A+", "A", "B+", "B", "C", "D", "F"],
  },
});

const ExamMarks = mongoose.model("ExamMarks", ExamMarksSchema);

export default ExamMarks;
