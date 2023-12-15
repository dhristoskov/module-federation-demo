import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  buyer: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  options: [
    {
      id: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
      title: { type: String, required: true },
      image: { type: String, required: false },
    },
  ],
  products: [{ type: mongoose.Types.ObjectId, required: true, ref: "Product" }],
  totalPrice: { type: Number, required: true },
  status: { type: String, required: true, default: "pending" },
  payment: {
    method: { type: String, required: true },
    transactionID: { type: String, required: true },
    date: { type: Date, required: true },
    status: { type: String, required: true },
  },
});

export default mongoose.model("Order", orderSchema);
