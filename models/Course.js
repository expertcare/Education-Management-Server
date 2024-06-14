import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  faculty: {
    type: String,
    required: true,
  },
});

const Course = mongoose.model("Course", CourseSchema);

export default Course;
