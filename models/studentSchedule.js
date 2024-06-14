import mongoose from "mongoose";

const studentScheduleSchema = new mongoose.Schema({
  time: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  teacher: {
    type: String,
    required: true,
  },
});

const StudentSchedule = mongoose.model(
  "StudentSchedule",
  studentScheduleSchema
);

export default StudentSchedule;
