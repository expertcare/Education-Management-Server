import express from "express";
import {
  changePassword,
  countGender,
  createUser,
  deleteUser,
  getAllUsersFullNameByRole,
  getFacultyCount,
  getStudentCount,
  getUserById,
  getUserNameById,
  getUsers,
  login,
  updateUser,
} from "../controller/userDataController.js";

const router = express.Router();

// Create a new user
router.post("/", createUser);

// Get sex ratio
router.get("/gender-count", countGender);

// Get all users
router.get("/", getUsers);

//Get all users FullName based on role
router.get("/role/:role", getAllUsersFullNameByRole);

// Get a user by ID
router.get("/:id", getUserById);

// Get students count
router.get("/students/count", getStudentCount);

// Get faculty count
router.get("/faculty/count", getFacultyCount);

// Update a user by ID
router.put("/:id", updateUser);

// Delete a user by ID
router.delete("/:id", deleteUser);

//Get user name by ID
router.get("/:id/name", getUserNameById); // New route to get user's name by ID

// Login route
router.post("/login", login);

//Change the password

router.put("/:id/change-password", changePassword);

export default router;
