import Attendance from "../models/attendanceModel.js";
import Course from "../models/Course.js";

// Function to handle attendance submission
const handleAttendance = async (req, res) => {
  try {
    const attendanceData = req.body;

    // Check if attendance already exists for the same date, time, and subject
    const existingAttendance = await Attendance.findOne({
      date: attendanceData.date,
      "schedules.time": attendanceData.schedules[0].time, // schedules is an array and checking the first item
      "schedules.subject": attendanceData.schedules[0].subject,
    });

    if (existingAttendance) {
      return res.status(400).json({
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

// Controller function to fetch attendance records by subject and calculate attendance details day-wise
const getAttendanceBySubject = async (req, res) => {
  const teacher = req.params.teacher;

  try {
    // Fetch attendance records for the given teacher
    const attendanceRecords = await Attendance.find({
      "schedules.teacher": teacher,
    });

    // Calculate attendance details day-wise
    const attendanceDataWithDetails = attendanceRecords.map((record) => {
      const date = record.date;
      const schedules = record.schedules.map((schedule) => ({
        time: schedule.time,
        subject: schedule.subject,
        teacher: schedule.teacher,
      }));
      const totalStudents = record.students.length;
      let presentCount = 0;

      // Count number of students marked as present for the current date
      record.students.forEach((student) => {
        if (student.attendance === "present") {
          presentCount++;
        }
      });

      // Calculate attendance percentage for the current date
      const attendancePercentage = (presentCount / totalStudents) * 100;

      return {
        date: date,
        schedules: schedules,
        attendancePercentage: attendancePercentage.toFixed(2), // Round to 2 decimal places
      };
    });

    res.json(attendanceDataWithDetails);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Controller function to fetch all courses data with attendance percentages
const getAllCoursesWithAttendance = async (req, res) => {
  try {
    // Fetch all courses from the database
    const courses = await Course.find({});

    // Prepare an array to hold course data with attendance details
    const coursesWithAttendance = [];

    // Iterate through each course
    for (let course of courses) {
      // Find attendance records related to the current course
      const attendanceRecords = await Attendance.find({
        "schedules.subject": course.name, // Assuming 'name' field in Course matches 'subject' in Attendance
      });

      // Calculate attendance percentage for the current course
      let totalAttendancePercentage = 0;
      if (attendanceRecords.length > 0) {
        const totalRecords = attendanceRecords.length;
        const totalAttendancePercentages = attendanceRecords.reduce(
          (acc, record) => {
            const presentCount = record.students.filter(
              (student) => student.attendance === "present"
            ).length;
            const totalStudents = record.students.length;
            const attendancePercentage = (presentCount / totalStudents) * 100;
            return acc + attendancePercentage;
          },
          0
        );
        totalAttendancePercentage = totalAttendancePercentages / totalRecords;
      }

      // Add course details along with attendance percentage to the array
      coursesWithAttendance.push({
        name: course.name,
        code: course.code,
        department: course.department,
        attendancePercentage: totalAttendancePercentage.toFixed(2), // Round to 2 decimal places
      });
    }

    res.json(coursesWithAttendance);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export {
  handleAttendance,
  getAttendance,
  getAttendanceByStudentId,
  getAttendanceBySubject,
  getAllCoursesWithAttendance,
};
