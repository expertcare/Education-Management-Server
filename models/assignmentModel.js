import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
  section: {
    type: String,
    required: true,
  },
  title: {
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
