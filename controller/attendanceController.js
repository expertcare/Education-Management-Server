import Attendance from "../models/attendanceModel.js";

// Function to handle attendance submission
const handleAttendance = async (req, res) => {
  try {
    const attendanceData = req.body;

    // Check if attendance already exists for the same date, time, and subject
    const existingAttendance = await Attendance.findOne({
      date: attendanceData.date,
      "schedules.time": attendanceData.schedules[0].time, // Assuming schedules is an array and we're checking the first item
      "schedules.subject": attendanceData.schedules[0].subject,
    });

    if (existingAttendance) {
      return res
        .status(400)
        .json({
          message:
            "Attendance already submitted for this date, time, and subject",
        });
    }

    const newAttendance = new Attendance(attendanceData);
    await newAttendance.save(); // Save the attendance data to the database
    res.status(201).json({ message: "Attendance submitted successfully" });
  } catch (error) {
    console.error("Error submitting attendance:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Function to get all attendance records
const getAttendance = async (req, res) => {
  try {
    const attendanceRecords = await Attendance.find();
    res.status(200).json(attendanceRecords);
  } catch (error) {
    console.error("Error fetching attendance records:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Function to get attendance records by student id
const getAttendanceByStudentId = async (req, res) => {
  const studentId = req.params.studentId; // Extract student ID from request parameters
  try {
    const attendanceRecords = await Attendance.find({
      "students.id": studentId,
    }).select({
      "students.$": 1,
      date: 1,
      schedules: 1,
    });

    if (attendanceRecords.length === 0) {
      return res.status(404).json({
        message: "Attendance records not found for this student",
      });
    }

    res.status(200).json(attendanceRecords);
  } catch (error) {
    console.error("Error fetching attendance records:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export { handleAttendance, getAttendance, getAttendanceByStudentId };
