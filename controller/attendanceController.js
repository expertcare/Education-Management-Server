import Attendance from "../models/attendanceModel.js";

// Function to handle attendance related logic
const handleAttendance = async (req, res) => {
  try {
    // Logic to handle attendance submission
    const attendanceData = req.body; // Assuming the request body contains attendance data
    const newAttendance = new Attendance(attendanceData);
    await newAttendance.save(); // Save the attendance data to the database
    res.status(201).json({ message: "Attendance submitted successfully" });
  } catch (error) {
    console.error("Error submitting attendance:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Function to get attendance records
const getAttendance = async (req, res) => {
  try {
    const attendanceRecords = await Attendance.find();
    res.status(200).json(attendanceRecords);
  } catch (error) {
    console.error("Error fetching attendance records:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { handleAttendance, getAttendance };
