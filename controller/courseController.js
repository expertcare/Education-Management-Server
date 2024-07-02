import Course from "../models/Course.js";

export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addCourse = async (req, res) => {
  const newCourse = new Course({
    name: req.body.name,
    faculty: req.body.faculty,
  });

  try {
    const checkCourse = await Course.findOne({
      name: req.body.name,
    });

    if (checkCourse) {
      return res.status(400).json({ message: "Course already exists" });
    }

    const savedCourse = await newCourse.save();
    res.status(201).json(savedCourse);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateCourse = async (req, res) => {
  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedCourse);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getCourseByFacultyName = async (req, res) => {
  const { faculty } = req.params;
  try {
    const courses = await Course.find({ faculty });
    res.json(courses);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
