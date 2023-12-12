import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { validationResult } from "express-validator";

import User from "../models/user.js";
import Address from "../models/address.js";

dotenv.config();

const getUserAddresses = async (req, res, next) => {
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

  let user;
  try {
    user = await User.findById(userId).populate("addresses");
  } catch (err) {
    res.status(500).json({ message: "Server failed, please try again later." });
    return;
  }

  if (!user) {
    res.status(404).json({ message: "User not found." });
    return;
  }

  res.status(200).json({ addresses: user.addresses });
};

const getAddressById = async (req, res, next) => {
  const addressId = req.params.id;
  const authHeader = req.get("Authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Not authenticated." });
    return;
  }

  let address;
  try {
    address = await Address.findById(addressId);
  } catch (err) {
    res.status(500).json({ message: "Server failed, please try again later." });
    return;
  }

  if (!address) {
    res.status(404).json({ message: "Address not found." });
    return;
  }

  res.status(200).json({ address: address });
};

const getUserAddressSelectedStatus = async (req, res, next) => {
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

  let user;
  try {
    user = await User.findById(userId).populate("addresses");
  } catch (err) {
    res.status(500).json({ message: "Server failed, please try again later." });
    return;
  }

  if (!user) {
    res.status(404).json({ message: "User not found." });
    return;
  }

  const selectedAddress = user.addresses.find(
    (address) => address.selected_status === true
  );

  if(user.addresses.length === 0) {
    res.status(200).json({ address: {} });
    return;
  }
  
  if (!selectedAddress && user.addresses.length > 0) {
    res.status(200).json({ address: user.addresses[0] });
    return;
  }

  res.status(200).json({ address: selectedAddress });
};

const updateAddressById = async (req, res, next) => {
  const addressId = req.params.id;
  const authHeader = req.get("Authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Not authenticated." });
    return;
  }

  let existingAddress;
  try {
    existingAddress = await Address.findById(addressId);
  } catch (err) {
    res.status(500).json({ message: "Server failed, please try again later." });
    return;
  }

  if (!existingAddress) {
    res.status(404).json({ message: "Address not found." });
    return;
  }

  const { street, street_number, city, postal_code, country } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  }

  const updateAddress = new Address({
    street,
    street_number,
    city,
    postal_code,
    country,
  });

  try {
    await Address.updateOne(
      { _id: addressId },
      {
        $set: {
          street: updateAddress.street,
          street_number: updateAddress.street_number,
          city: updateAddress.city,
          postal_code: updateAddress.postal_code,
          country: updateAddress.country,
        },
      }
    );
  } catch (err) {
    res.status(500).json({ message: "Update failed, please try again later." });
    return;
  }

  res.status(200).json({
    street: updateAddress.street,
    street_number: updateAddress.street_number,
    city: updateAddress.city,
    postal_code: updateAddress.postal_code,
    country: updateAddress.country,
  });
};

const updateAddressSelectedStatus = async (req, res, next) => {
  const addressId = req.params.id;
  const authHeader = req.get("Authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Not authenticated." });
    return;
  }

  let existingAddress;
  try {
    existingAddress = await Address.findById(addressId);
  } catch (err) {
    res.status(500).json({ message: "Server failed, please try again later." });
    return;
  }

  if (!existingAddress) {
    res.status(404).json({ message: "Address not found." });
    return;
  }

  let user;
  try {
    user = await User.findById(existingAddress.user);
  } catch (err) {
    res.status(500).json({ message: "Server failed, please try again later." });
    return;
  }

  if (!user) {
    res.status(404).json({ message: "User not found." });
    return;
  }

  try {
    const selectedAddress = await Address.findOne({
      user: user.id,
      selected_status: true,
    });
    if (selectedAddress && selectedAddress.id !== existingAddress.id) {
      selectedAddress.selected_status = false;
      await selectedAddress.save();
    }
    await Address.updateOne(
      { _id: addressId },
      {
        $set: {
          selected_status: !existingAddress.selected_status,
        },
      }
    );
  } catch (err) {
    res.status(500).json({ message: "Update failed, please try again later." });
    return;
  }

  res.status(200).json({ message: "Address selected status updated." });
};

const addNewAddress = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  }

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
    res.status(500).json({ message: "Server failed, please try again later." });
    return;
  }

  if (!existingUser) {
    res.status(404).json({ message: "User not found." });
    return;
  }

  const { street, street_number, city, postal_code, country } = req.body;

  const createdAddress = new Address({
    street,
    street_number,
    city,
    postal_code,
    country,
    selected_status: false,
    user: existingUser.id,
  });

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdAddress.save({ session: sess });
    existingUser.addresses.push(createdAddress);
    await existingUser.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    res.status(500).json({ message: "Server failed, please try again later." });
    return;
  }

  res.status(200).json({ address: createdAddress });
};

const deleteAddress = async (req, res, next) => {
  const addressId = req.params.id;
  const authHeader = req.get("Authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Not authenticated." });
    return;
  }

  let existingAddress;
  try {
    existingAddress = await Address.findById(addressId);
  } catch (err) {
    res.status(500).json({ message: "Server failed, please try again later." });
    return;
  }

  if (!existingAddress) {
    res.status(404).json({ message: "Address not found." });
    return;
  }

  let user;
  try {
    user = await User.findById(existingAddress.user);
  } catch (err) {
    res.status(500).json({ message: "Server failed, please try again later." });
    return;
  }

  if (!user) {
    res.status(404).json({ message: "User not found." });
    return;
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await Address.findByIdAndDelete(addressId, { session: sess });
    await user.addresses.pull(existingAddress);
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    res.status(500).json({ message: "Server failed, please try again later." });
    return;
  }

  res.status(200).json({ message: "Address deleted." });
};

export default {
  getUserAddresses,
  getAddressById,
  getUserAddressSelectedStatus,
  updateAddressById,
  updateAddressSelectedStatus,
  addNewAddress,
  deleteAddress,
};
