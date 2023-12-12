import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import User from "../models/user.js";
import Product from "../models/product.js";
import Basket from "../models/basket.js";

dotenv.config();

const addProductToBasket = async (req, res, next) => {
  const { id, title, price, onSale, discount, quantity, image } = req.body;

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

  if (!existingUser.basket) {
    const basket = new Basket({
      products: [],
      user: userId,
    });

    try {
      const session = await mongoose.startSession();
      session.startTransaction();
      await basket.save({ session: session });
      existingUser.basket = basket;
      await existingUser.save({ session: session });
      await session.commitTransaction();
    } catch (err) {
      res
        .status(500)
        .json({ message: "Server failed, please try again later." });
      return;
    }
  }

  if (existingUser.basket) {
    const basketId = existingUser.basket;

    let existingBasket;
    try {
      existingBasket = await Basket.findById(basketId);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Server failed, please try again later." });
      return;
    }

    if (!existingBasket) {
      res.status(404).json({ message: "Basket not found." });
      return;
    }

    let existingProduct;
    try {
      existingProduct = await Product.findOne({
        id: id,
        basket: basketId,
      });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Server failed, please try again later." });
      return;
    }

    if (existingProduct) {
      existingProduct.quantity += 1;
      existingProduct.price += price;

      try {
        await existingProduct.save();
      } catch (err) {
        res
          .status(500)
          .json({ message: "Server failed, please try again later." });
        return;
      }
    }

    if (!existingProduct) {
      const product = new Product({
        id,
        title,
        price,
        onSale,
        discount,
        quantity: 1,
        image,
        basket: basketId,
      });

      try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await product.save({ session: session });
        existingBasket.products.push(product);
        await existingBasket.save({ session: session });
        await session.commitTransaction();
      } catch (err) {
        res
          .status(500)
          .json({ message: "Server failed, please try again later." });
        return;
      }
    }

    res.status(200).json({ message: "Product added to basket!" });
  }
};

const removeAllProducts = async (req, res, next) => {
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
    existingUser = await User.findById(userId).populate({
      path: "basket",
      populate: {
        path: "products",
        model: "Product",
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server failed, please try again later." });
    return;
  }

  if (!existingUser) {
    res.status(404).json({ message: "User not found." });
    return;
  }

  const basketId = existingUser.basket;
  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await Product.deleteMany({ basket: basketId });
    await Basket.findByIdAndUpdate(basketId, { products: [] });
    await session.commitTransaction();
  } catch (err) {
    res.status(500).json({ message: "Server failed, please try again later." });
    return;
  }

  res.status(200).json({ message: "Basket cleared!" });
};

const deleteProductFromBasket = async (req, res, next) => {
  const productId = req.params.id;

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
    existingUser = await User.findById(userId).populate({
      path: "basket",
      populate: {
        path: "products",
        model: "Product",
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server failed, please try again later." });
    return;
  }

  if (!existingUser) {
    res.status(404).json({ message: "User not found." });
    return;
  }

  const basketId = existingUser.basket;

  let existingProduct;
  try {
    existingProduct = await Product.findOne({
      _id: productId,
      basket: basketId,
    });
  } catch (err) {
    res.status(500).json({ message: "Server failed, please try again later." });
    return;
  }

  if (!existingProduct) {
    res.status(404).json({ message: "Product not found." });
    return;
  }

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await Product.findByIdAndDelete(existingProduct._id);
    await Basket.findByIdAndUpdate(basketId, {
      $pull: { products: existingProduct._id },
    });
    await session.commitTransaction();
  } catch (err) {
    res.status(500).json({ message: "Server failed, please try again later." });
    return;
  }

  res.status(200).json({ message: "Product deleted from basket!" });
};

const getBasketProducts = async (req, res, next) => {
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
    existingUser = await User.findById(userId).populate({
      path: "basket",
      populate: {
        path: "products",
        model: "Product",
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server failed, please try again later." });
    return;
  }

  if (!existingUser) {
    res.status(404).json({ message: "User not found." });
    return;
  }

  if (!existingUser.basket) {
    const basket = new Basket({
      products: [],
      user: userId,
    });

    try {
      const session = await mongoose.startSession();
      session.startTransaction();
      await basket.save({ session: session });
      existingUser.basket = basket;
      await existingUser.save({ session: session });
      await session.commitTransaction();
    } catch (err) {
      res
        .status(500)
        .json({ message: "Server failed, please try again later." });
      return;
    }
  }

  let totalPrice = 0;
  existingUser.basket.products.forEach((product) => {
    totalPrice += product.price;
  });

  res.status(200).json({
    basket: {
      products: existingUser.basket.products || [],
      totalPrice: totalPrice.toFixed(2) || 0,
    },
  });
};

const changeQuantity = async (req, res, next) => {
  const productId = req.body.id;
  const direction = req.body.direction;

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
    existingUser = await User.findById(userId).populate({
      path: "basket",
      populate: {
        path: "products",
        model: "Product",
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server failed, please try again later." });
  }

  if (!existingUser) {
    res.status(404).json({ message: "User not found." });
    return;
  }

  const basketId = existingUser.basket;

  let existingProduct;
  try {
    existingProduct = await Product.findOne({
      _id: productId,
      basket: basketId,
    });
  } catch (err) {
    res.status(500).json({ message: "Server failed, please try again later." });
  }

  if (!existingProduct) {
    res.status(404).json({ message: "Product not found." });
    return;
  }

  const productPrice =
    existingProduct.quantity > 1
      ? (existingProduct.price / existingProduct.quantity).toFixed(2)
      : existingProduct.price;

  if (direction === "plus") {
    existingProduct.quantity += 1;
    existingProduct.price += productPrice;
  }

  if (direction === "minus") {
    existingProduct.quantity -= 1;
    existingProduct.price -= productPrice;
  }

  try {
    await existingProduct.save();
  } catch (err) {
    res.status(500).json({ message: "Server failed, please try again later." });
  }

  res.status(200).json({ message: "Quantity changed!" });
};

export default {
  getBasketProducts,
  addProductToBasket,
  removeAllProducts,
  changeQuantity,
  deleteProductFromBasket,
};
