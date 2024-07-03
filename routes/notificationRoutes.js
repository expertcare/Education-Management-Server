import express from "express";
import {
  addNotification,
  deleteNotification,
  getAllNotifications,
  getNotificationByRole,
  getNotificationByUser,
} from "../controller/notificationController.js";

const router = express.Router();

// Routes for managing notifications

// Get all notifications
router.get("/", getAllNotifications);

//Get Notifications by Role
router.get("/:role", getNotificationByRole);

//Get Notification by user
router.get("/user/:selectedUser", getNotificationByUser);

// Add a new notification
router.post("/", addNotification);

// Delete a notification
router.delete("/:id", deleteNotification);

export default router;
