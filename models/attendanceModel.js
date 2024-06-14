import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  date: String,
  schedules: [
    {
      time: String,
      subject: String,
      teacher: String,
    },
  ],
  students: [
    {
      id: String,
      attendance: String,
    },
  ],
});

const Attendance = mongoose.model("Attendance", attendanceSchema);

export default Attendance;
