import UsersData from "../models/UsersData.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import StatusCodes from "http-status-codes";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Configure nodemailer transporter
// const transporter = nodemailer.createTransport({
//   host: "live.smtp.mailtrap.io",
//   port: 587,
//   auth: {
//     user: "api", // Your Mailtrap SMTP username
//     pass: "97266073199728c07fb0cc3a5e1efdaa", // Your Mailtrap SMTP password
//   },
// });

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "arm3cse@gmail.com", // Gmail email address
    pass: "gbdcodlfflsmnoku", // App-Specific Password
  },
});

export const createUser = async (req, res) => {
  const { username, password, role, email, fullName, gender } = req.body;

  try {
    const existingUser = await UsersData.findOne({
      $or: [{ email }, { username }],
    });
    if (existingUser) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "User with this email or username already registered.",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UsersData({
      username,
      password: hashedPassword,
      role,
      email,
      fullName,
      gender,
      isActive: true,
    });

    const savedUserData = await newUser.save();

    // Send email notification
    const mailOptions = {
      // from: '"Mailtrap Test" <mailtrap@demomailtrap.com>',
      from: '"EDUCATION MANAGEMENT" <arm3cse@gmail.com>',
      to: email, // Use the user's email here
      subject: "Account created successfully",
      // text: `Hello ${fullName},\n\nYour account has been created successfully.`,
      html: `
        <html>
          <body>
            <h2>Welcome to EDUCATION MANAGEMENT APP</h2>
            <p>Hello ${fullName},</p>
            <p>Your role is ${role}</p>
            <p>Your account has been created successfully!</p>
            <p>Your username: ${username}</p>
            <p>Your password: ${password}</p>
            <p>The Website link as follows</p>
            <p>https://education-management-app-react-atharv.vercel.app/</p>
            <p>Best regards,</p>
            <p>The EDUCATION MANAGEMENT Team</p>
          </body>
        </html>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        // Handle error response to client if needed
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          message: "Error sending email",
          success: false,
        });
      } else {
        console.log("Email sent:", info.response);
      }
    });

    const responseData = savedUserData.toObject();
    delete responseData.password;

    res.status(StatusCodes.OK).json({
      id: savedUserData._id,
      ...responseData,
      success: true,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Server error during user creation", success: false });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await UsersData.find();
    const modifiedUsers = users.map((user) => ({
      id: user._id,
      ...user.toObject(),
    }));
    res.status(200).json(modifiedUsers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await UsersData.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ id: user._id, ...user.toObject() });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const updatedUser = await UsersData.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ id: updatedUser._id, ...updatedUser.toObject() });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await UsersData.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Get only userName by ID
export const getUserNameById = async (req, res) => {
  try {
    const user = await UsersData.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ name: user.fullName });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all users FullName based on role
export const getAllUsersFullNameByRole = async (req, res) => {
  try {
    const users = await UsersData.find({ role: req.params.role });
    if (!users) {
      return res.status(404).json({ message: "Users not found" });
    }
    const modifiedUsers = users.map((user) => ({
      id: user._id,
      fullName: user.fullName,
    }));
    res.status(200).json(modifiedUsers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a count of students
export const getStudentCount = async (req, res) => {
  try {
    const count = await UsersData.countDocuments({ role: "student" });
    res.status(200).json({ count: count });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a count of faculties
export const getFacultyCount = async (req, res) => {
  try {
    const count = await UsersData.countDocuments({ role: "faculty" });
    res.status(200).json({ count: count });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Controller function to handel couunting males and females
export const countGender = async (req, res) => {
  try {
    const users = await UsersData.find({
      isActive: true,
      role: { $ne: "admin" },
    }); // Only for active users and Exclude admin role
    let maleCount = 0;
    let femaleCount = 0;

    //Count males and females
    users.forEach((user) => {
      if (user.gender === "male") {
        maleCount++;
      } else if (user.gender === "female") {
        femaleCount++;
      }
    });

    const totalCount = maleCount + femaleCount;
    const malePercentage = (maleCount / totalCount) * 100;
    const femalePercentage = (femaleCount / totalCount) * 100;

    res.status(200).json({
      success: true,
      maleCount,
      femaleCount,
      malePercentage,
      femalePercentage,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error counting genders",
      error: error.message,
    });
  }
};

export const login = async (req, res) => {
  const { username, password, role } = req.body;

  try {
    const user = await UsersData.findOne({ username, role });

    if (!user) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Invalid credentials", success: false });
    }

    if (!user.isActive) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: "You are not active, please contact admin",
        success: false,
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Invalid password", success: false });
    }

    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    res.status(StatusCodes.OK).json({
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        fullName: user.fullName,
        gender: user.gender,
        role: user.role,
      },
      token,
      success: true,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Server error during login", success: false });
  }
};

// Change password

export const changePassword = async (req, res) => {
  const { id } = req.params;
  const { currentPassword, newPassword } = req.body;

  try {
    // Validate inputs
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ errors: errors.array() });
    }

    // Find user by ID
    const user = await UsersData.findById(id);
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "User not found", success: false });
    }

    // Check if current password is correct
    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password
    );
    if (!isPasswordValid) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Current password is incorrect", success: false });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user's password
    user.password = hashedPassword;
    await user.save();

    // Optionally, you may want to invalidate existing tokens here

    res
      .status(StatusCodes.OK)
      .json({ message: "Password updated successfully", success: true });
  } catch (error) {
    console.error("Error changing password:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Server error during password change", success: false });
  }
};
