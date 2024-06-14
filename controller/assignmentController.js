import Assignment from "../models/assignmentModel.js";

// Controller to get all assignments
const getAllAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find();

    // Format dueDate property in assignments before sending to frontend
    const formattedAssignments = assignments.map((assignment) => ({
      ...assignment._doc,
      dueDate: assignment.dueDate.toISOString().split("T")[0], // Format as "YYYY-MM-DD"
    }));

    res.status(200).json(formattedAssignments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to add a new assignment
const addAssignment = async (req, res) => {
  const assignment = new Assignment({
    section: req.body.section,
    title: req.body.title,
    description: req.body.description,
    dueDate: req.body.dueDate,
  });
  try {
    const newAssignment = await assignment.save();

    // Format dueDate property in newAssignment before sending to frontend
    newAssignment.dueDate = newAssignment.dueDate.toISOString().split("T")[0];

    res.status(201).json(newAssignment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller to update an existing assignment
const updateAssignment = async (req, res) => {
  try {
    const updateAssignment = await Assignment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    // Format dueDate property in updateAssignment before sending to frontend
    updateAssignment.dueDate = updateAssignment.dueDate
      .toISOString()
      .split("T")[0];

    res.json(updateAssignment);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Controller to delete an assignment
const deleteAssignment = async (req, res) => {
  try {
    await Assignment.findByIdAndDelete(req.params.id);
    res.json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export { getAllAssignments, addAssignment, updateAssignment, deleteAssignment };
