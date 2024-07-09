import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["student", "faculty"],
    required: true,
  },
  selectedUser: {
    type: String,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now, // Default value is current date and time
  },
});

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
