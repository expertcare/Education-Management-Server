// controllers/question.controller.js

import Question from "../models/questionModel.js";
import XLSX from "xlsx";

// Create a new question
export const createQuestion = async (req, res) => {
  try {
    const { question, options, correctAnswer, courseName, courseFaculty } =
      req.body;

    // check if the question already exists for the same course and faculty
    const existingQuestion = await Question.findOne({
      question,
      courseName,
      courseFaculty,
    });

    if (existingQuestion) {
      return res.status(400).json({ message: "Question already exists" });
    }

    const newQuestion = await Question.create({
      question,
      options,
      correctAnswer,
      courseName,
      courseFaculty,
    });
    res.status(201).json(newQuestion);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all questions
export const getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a question
export const updateQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const { question, options, correctAnswer, courseName, courseFaculty } =
      req.body;
    const updatedQuestion = await Question.findByIdAndUpdate(
      id,
      { question, options, correctAnswer, courseName, courseFaculty },
      { new: true }
    );
    res.json(updatedQuestion);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a question
export const deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    await Question.findByIdAndDelete(id);
    res.json({ message: "Deleted question" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete all questions of a course
export const deleteQuestionByCourse = async (req, res) => {
  const { course } = req.params;

  try {
    console.log(course, "coursename");

    const result = await Question.deleteMany({ courseName: { $in: course } });
    res.json({
      message: `Deleted ${
        result.deletedCount
      } questions for courses: ${course.join(", ")}`,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get questions by courseName
export const getQuestionsByCourse = async (req, res) => {
  const { courseName } = req.params;
  console.log(courseName, "coursename");
  try {
    const questions = await Question.find({ courseName });
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//Get question by faculty name
export const getQuestionsByFaculty = async (req, res) => {
  const { courseFaculty } = req.params;
  try {
    const questions = await Question.find({ courseFaculty });
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Import excel file and get stored json in database

export const uploadExcel = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0]; // Assuming only one sheet
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { raw: true });

    //Validate and transform each item in jsonData before inserting
    const validateData = jsonData.map((item) => {
      //Convert options from a comma-seprated string to an array

      const optionsArray = item.options
        .split(",")
        .map((option) => option.trim());

      return {
        question: item.question,
        options: optionsArray,
        correctAnswer: parseInt(item.correctAnswer), //Convert correct answer to number
        courseName: item.courseName,
        courseFaculty: item.courseFaculty,
      };
    });

    // Save JSON data to MongoDB
    await Question.insertMany(validateData);

    res.json({ message: "File uploaded and data saved to mongoDB" });
  } catch (error) {
    console.error("Error uploading file: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
