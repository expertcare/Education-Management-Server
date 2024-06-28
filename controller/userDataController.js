import UsersData from "../models/UsersData.js";
import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt";
import StatusCodes from "http-status-codes";

export const createUser = async (req, res) => {
  const { username, role, email, fullName, gender, password } = req.body;

  try {
    const existingUser = await UsersData.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "User with this email or username already registered.",
        success: false
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UsersData({
      username,
      role,
      email,
      fullName,
      gender,
      password: hashedPassword,
    });

    const savedUserData = await newUser.save();

    const responseData = savedUserData.toObject();
    delete responseData.password;

    res.status(StatusCodes.OK).json({
      id: savedUserData._id,
      ...responseData,
      success: true
    });

  } catch (error) {
    console.error("Error creating user:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Server error during user creation", success: false });
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

export const login = async (req, res) => {
  const { username, password, role } = req.body;

  try {
    const user = await UsersData.findOne({ username, role });

    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Invalid credentials", success: false });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Invalid password", success: false });
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
        role: user.role
      },
      token,
      success: true
    });

  } catch (error) {
    console.error("Error during login:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Server error during login", success: false });
  }
};
