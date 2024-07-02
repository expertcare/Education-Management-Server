import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  courseName: {
    type: String,
    required: true,
  },
  section: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
});

const Assignment = mongoose.model("Assignment", assignmentSchema);

export default Assignment;
