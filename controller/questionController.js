// controllers/question.controller.js

import Question from "../models/questionModel.js";

// Create a new question
export const createQuestion = async (req, res) => {
  try {
    const { question, options, correctAnswer, courseName, courseFaculty } =
      req.body;
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

// Get questions by courseName
export const getQuestionsByCourse = async (req, res) => {
  const { courseName } = req.params;
  try {
    const questions = await Question.find({ courseName });
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
