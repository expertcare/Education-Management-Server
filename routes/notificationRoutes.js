import express from "express";
import {
  addNotification,
  deleteNotification,
  getAllNotifications,
  getNotificationByRole,
} from "../controller/notificationController.js";

const router = express.Router();

// Routes for managing notifications

// Get all notifications
router.get("/", getAllNotifications);

//Get Notifications by Role
router.get("/:role", getNotificationByRole);

// Add a new notification
router.post("/", addNotification);

// Delete a notification
router.delete("/:id", deleteNotification);

export default router;
