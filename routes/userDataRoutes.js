import express from "express";
import {
  createUser,
  deleteUser,
  getUserById,
  getUserNameById,
  getUsers,
  login,
  updateUser,
} from "../controller/userDataController.js";

const router = express.Router();

// Create a new user
router.post("/", createUser);

// Get all users
router.get("/", getUsers);

// Get a user by ID
router.get("/:id", getUserById);

// Update a user by ID
router.put("/:id", updateUser);

// Delete a user by ID
router.delete("/:id", deleteUser);

//Get user name by ID
router.get("/:id/name", getUserNameById); // New route to get user's name by ID

// Login route
router.post("/login", login);

export default router;
