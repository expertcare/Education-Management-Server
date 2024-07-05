// grades.controller.js

import Grade from "../models/gradesModel.js";

// Controller function to add a grade
export const addGrade = async (req, res) => {
  try {
    const { submissionId, grade, gradedBy } = req.body;

    const newGrade = new Grade({
      submissionId,
      grade,
      gradedBy,
    });

    await newGrade.save();
    res.status(201).json(newGrade);
  } catch (error) {
    console.error("Error adding grade:", error);
    res.status(500).json({ message: "Failed to add grade" });
  }
};

// Controller function to get all grades
export const getAllGrades = async (req, res) => {
  try {
    // Query the Grade model to find all grades
    const grades = await Grade.find();

    res.status(200).json(grades);
  } catch (error) {
    console.error("Error fetching grades:", error);
    res.status(500).json({ message: "Failed to fetch grades" });
  }
};

// Controller for get assignments that who has graded by
export const getAssignmentGradedByFaculty = async (req, res) => {
  try {
    const { faculty } = req.params;
    const grades = await Grade.find({ gradedBy: faculty });
    res.status(200).json(grades);
  } catch (error) {
    console.error("Error fetching grades:", error);
    res.status(500).json({ message: "Failed to fetch grades" });
  }
};
