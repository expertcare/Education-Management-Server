import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema({
  assignmentId: String,
  userName: String,
  userId: String,
  file: {
    type: String,
    required: true,
  },
});

const Submission = mongoose.model("Submission", submissionSchema);

export default Submission;
