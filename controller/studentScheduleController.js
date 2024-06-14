import StudentSchedule from "../models/studentSchedule.js";
// Controller for handling CRUD operations on student schedules

// Get all student schedules
const getAllStudentSchedules = async (req, res) => {
  try {
    const studentSchedules = await StudentSchedule.find();
    res.json(studentSchedules);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new student schedule
const addStudentSchedule = async (req, res) => {
  const studentSchedule = new StudentSchedule(req.body);
  try {
    const newStudentSchedule = await studentSchedule.save();
    res.status(201).json(newStudentSchedule);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a student schedule
const updateStudentSchedule = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedStudentSchedule = await StudentSchedule.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    res.json(updatedStudentSchedule);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a student schedule
const deleteStudentSchedule = async (req, res) => {
  const { id } = req.params;
  try {
    await StudentSchedule.findByIdAndDelete(id);
    res.json({ message: "Student schedule deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  getAllStudentSchedules,
  addStudentSchedule,
  updateStudentSchedule,
  deleteStudentSchedule,
};
