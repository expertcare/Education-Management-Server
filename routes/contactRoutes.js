import express from "express";
import { addContact, getAllContacts } from "../controller/contactController.js";

const router = express.Router();

// Routes for managing contact information

// Get all contacts
router.get("/", getAllContacts);

// Add a new contact
router.post("/", addContact);

export default router;
