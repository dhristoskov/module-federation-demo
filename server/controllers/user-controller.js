import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { validationResult } from "express-validator";

import User from "../models/user.js";
import Basket from "../models/basket.js";
import Address from "../models/address.js";

dotenv.config();

const registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  }

  const { first_name, last_name, username, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ username });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Registration failed, please try again later." });
    return;
  }

  if (existingUser) {
    res.status(422).json({
      message:
        "Username exists already, please login instead or choose different name.",
    });
    return;
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Could not create user, please try again." });
    return;
  }

  const createdUser = new User({
    first_name,
    last_name,
    username,
    password: hashedPassword,
    email: "",
    phone_number: "",
    role: "user",
    user_type: "default",
    basket: null,
    addresses: [],
    orders: [],
  });

  try {
    await createdUser.save();
  } catch (err) {
    res
      .status(500)
      .json({ message: "Registration failed, please try again later." });
    return;
  }

  let token;
  try {
    token = jwt.sign(
      { userId: createdUser.id, username: createdUser.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
  } catch (err) {
    res
      .status(500)
      .json({ message: "Registration failed, please try again later." });
    return;
  }

  res.status(200).json({
    id: createdUser.id,
    username: createdUser.username,
    first_name: createdUser.first_name,
    last_name: createdUser.last_name,
    token: token,
  });
};

const loginUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  }

  const { username, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ username });
  } catch (err) {
    res.status(500).json({ message: "Login failed, please try again later." });
    return;
  }

  if (!existingUser) {
    res
      .status(403)
      .json({ message: "Invalid credentials, could not log you in." });
    return;
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    res.status(500).json({ message: "Login failed, please try again later." });
    return;
  }

  if (!isValidPassword) {
    res
      .status(403)
      .json({ message: "Invalid credentials, could not log you in." });
    return;
  }

  let token;
  try {
    token = jwt.sign(
      { userId: existingUser.id, username: existingUser.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
  } catch (err) {
    res.status(500).json({ message: "Login failed, please try again later." });
    return;
  }

  res.status(200).json({
    id: existingUser.id,
    username: existingUser.username,
    first_name: existingUser.first_name,
    last_name: existingUser.last_name,
    token: token,
  });
};

const addOrUpdatePhoneNumber = async (req, res, next) => {
  const { phone_number } = req.body;

  const authHeader = req.get("Authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Not authenticated." });
    return;
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    res.status(500).json({ message: "Server failed, please try again later." });
    return;
  }

  const userId = decodedToken.userId;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  }

  let existingUser;
  try {
    existingUser = await User.findById(userId);
  } catch (err) {
    res.status(500).json({ message: "Server failed, please try again later." });
    return;
  }

  if (!existingUser) {
    res.status(404).json({ message: "User not found." });
    return;
  }

  existingUser.phone_number = phone_number;

  try {
    await existingUser.save();
  } catch (err) {
    res
      .status(500)
      .json({ message: "Add/Update failed, please try again later." });
    return;
  }

  res.status(200).json({ message: "Phone number added/ updated!." });
};

const addOrUpdateEmailAddress = async (req, res, next) => {
  const { email } = req.body;

  const authHeader = req.get("Authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Not authenticated." });
    return;
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    res.status(500).json({ message: "Server failed, please try again later." });
    return;
  }

  const userId = decodedToken.userId;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  }

  let existingUser;
  try {
    existingUser = await User.findById(userId);
  } catch (err) {
    res.status(500).json({ message: "Server failed, please try again later." });
    return;
  }

  if (!existingUser) {
    res.status(404).json({ message: "User not found." });
    return;
  }

  existingUser.email = email;

  try {
    await existingUser.save();
  } catch (err) {
    res
      .status(500)
      .json({ message: "Add/Update failed, please try again later." });
    return;
  }

  res.status(200).json({ message: "Email address added/ updated!." });
};

const changeAccountPassword = async (req, res, next) => {
  const { actual_password, new_password, confirm_password } = req.body;

  const authHeader = req.get("Authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Not authenticated." });
    return;
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    res.status(500).json({ message: "Server failed, please try again later." });
    return;
  }

  const userId = decodedToken.userId;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  }

  let existingUser;
  try {
    existingUser = await User.findById(userId);
  } catch (err) {
    res.status(500).json({ message: "Server failed, please try again later." });
    return;
  }

  if (!existingUser) {
    res.status(404).json({ message: "User not found." });
    return;
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(
      actual_password,
      existingUser.password
    );
  } catch (err) {
    res.status(500).json({ message: "Login failed, please try again later." });
    return;
  }

  if (!isValidPassword) {
    res.status(403).json({ message: "Invalid credentials." });
    return;
  }

  if (new_password !== confirm_password) {
    res.status(403).json({ message: "Passwords do not match." });
    return;
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(new_password, 12);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Could not change user passowrd, please try again." });
    return;
  }

  existingUser.password = hashedPassword;

  try {
    await existingUser.save();
  } catch (err) {
    res
      .status(500)
      .json({ message: "Change password failed, please try again later." });
    return;
  }

  res.status(200).json({ message: "Password changed!." });
};

const getUserInformation = async (req, res, next) => {
  const authHeader = req.get("Authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Not authenticated." });
    return;
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    res.status(500).json({ message: "Server failed, please try again later." });
    return;
  }

  const userId = decodedToken.userId;

  let existingUser;
  try {
    existingUser = await User.findById(userId);
  } catch (err) {
    res.status(500).json({ message: "Server failed, please try again later or now." });
    return;
  }

  if (!existingUser) {
    res.status(404).json({ message: "User not found." });
    return;
  }

  res.status(200).json({
    email: existingUser.email ? existingUser.email : "",
    phone_number: existingUser.phone_number ? existingUser.phone_number : "",
    password: '**********'
  });
};

const deleteUserAccount = async (req, res, next) => {
  const { password } = req.body;
  const authHeader = req.get("Authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Not authenticated." });
    return;
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    res.status(500).json({ message: "Server failed, please try again later." });
    return;
  }

  const userId = decodedToken.userId;

  let existingUser;
  try {
    existingUser = await User.findById(userId);
  } catch (err) {
    res.status(500).json({ message: "Server failed, please try again later or now." });
    return;
  }

  if (!existingUser) {
    res.status(404).json({ message: "User not found." });
    return;
  }

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    res.status(500).json({ message: "Login failed, please try again later." });
    return;
  }

  if (!isValidPassword) {
    res.status(403).json({ message: "Invalid credentials." });
    return;
  }

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await Basket.deleteOne({ _id: existingUser.basket });
    await Address.deleteMany({ _id: { $in: existingUser.addresses } });
    await User.deleteOne({ _id: userId });
    await session.commitTransaction();
    session.endSession();
  } catch (err) {
    res.status(500).json({ message: "Server failed, please try again later." });
    return;
  }

  res.status(200).json({ message: "User account deleted!." });
};

export default {
  registerUser,
  loginUser,
  addOrUpdateEmailAddress,
  addOrUpdatePhoneNumber,
  changeAccountPassword,
  getUserInformation,
  deleteUserAccount,
};
