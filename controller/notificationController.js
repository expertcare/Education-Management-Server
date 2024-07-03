import Notification from "../models/notificationModel.js";

// Controller for handling CRUD operations on notifications

// Get all notifications
export const getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ selectedUser: "" });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Get Notification by role
export const getNotificationByRole = async (req, res) => {
  try {
    const notifications = await Notification.find({
      role: req.params.role,
      selectedUser: "",
    });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Get Notification by selected user
export const getNotificationByUser = async (req, res) => {
  try {
    const notifications = await Notification.find({
      selectedUser: req.params.selectedUser,
    });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get notification to indivaidual student
export const getNotificationToStudent = async (req, res) => {
  try {
    const notifications = await Notification.find({
      role: "student",
      to: req.params.id,
    });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new notification
export const addNotification = async (req, res) => {
  const notification = new Notification(req.body);
  try {
    const newNotification = await notification.save();
    res.status(201).json(newNotification);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a notification
export const deleteNotification = async (req, res) => {
  const { id } = req.params;
  try {
    await Notification.findByIdAndDelete(id);
    res.json({ message: "Notification deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
