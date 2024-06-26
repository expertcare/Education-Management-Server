import UsersData from "../models/UsersData.js";

export const createUser = async (req, res) => {
  try {
    const userData = new UsersData(req.body);
    const savedUserData = await userData.save();
    res
      .status(201)
      .json({ id: savedUserData._id, ...savedUserData.toObject() });
  } catch (error) {
    res.status(400).json({ message: error.message });
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
