// grades.model.js

import mongoose from "mongoose";

const GradeSchema = new mongoose.Schema({
  submissionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Submission",
    required: true,
  },
  grade: {
    type: String,
    enum: ["A", "B", "C", "D", "F"],
    required: true,
  },
  gradedBy: {
    type: String,
    required: true,
  },
  gradedAt: {
    type: Date,
    default: Date.now,
  },
});

const Grade = mongoose.model("Grade", GradeSchema);

export default Grade;
