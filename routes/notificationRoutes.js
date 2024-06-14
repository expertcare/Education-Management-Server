import express from "express";
import {
  addNotification,
  deleteNotification,
  getAllNotifications,
} from "../controller/notificationController.js";

const router = express.Router();

// Routes for managing notifications

// Get all notifications
router.get("/", getAllNotifications);

// Add a new notification
router.post("/", addNotification);

// Delete a notification
router.delete("/:id", deleteNotification);

export default router;
