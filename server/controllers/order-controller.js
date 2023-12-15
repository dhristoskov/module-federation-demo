import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import Order from "../models/order.js";
import Basket from "../models/basket.js";
import User from "../models/user.js";

dotenv.config();

const getOrders = async (req, res, next) => {
  // ToDo
  console.log("getOrders");
};

const addOrder = async (req, res, next) => {
  // ToDo
  console.log("addOrder");
};

const getOrderByID = async (req, res, next) => {
  // ToDo
  console.log("getOrderByID");
}

export default {
  getOrders,
  addOrder,
  getOrderByID,
};
