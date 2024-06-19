import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema({
  assignmentId: String,
  userName: String,
  userId: String,
  fileUrl: {
    type: String,
    required: true,
  },
  submissionDate: {
    type: Date,
    default: Date.now,
  },
});

const Submission = mongoose.model("Submission", submissionSchema);

export default Submission;
