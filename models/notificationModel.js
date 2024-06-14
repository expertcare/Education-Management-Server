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
});

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
