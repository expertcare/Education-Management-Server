import Assignment from "../models/assignmentModel.js";

// Controller to get all assignments for a specific user
const getAllAssignments = async (req, res) => {
  const userId = req.query.userId; // Assuming userId is passed in query params

  try {
    const assignments = await Assignment.find({ userId });

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
  const { section, title, description, dueDate, userId } = req.body;

  const assignment = new Assignment({
    section,
    title,
    description,
    dueDate,
    userId, // Assign the userId received from the request body
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
  const { section, title, description, dueDate } = req.body;

  try {
    const updatedAssignment = await Assignment.findByIdAndUpdate(
      req.params.id,
      { section, title, description, dueDate },
      { new: true }
    );

    // Format dueDate property in updatedAssignment before sending to frontend
    updatedAssignment.dueDate = updatedAssignment.dueDate
      .toISOString()
      .split("T")[0];

    res.json(updatedAssignment);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Controller to delete an assignment
const deleteAssignment = async (req, res) => {
  try {
    await Assignment.findByIdAndDelete(req.params.id);
    res.json({ message: "Assignment deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export { getAllAssignments, addAssignment, updateAssignment, deleteAssignment };
