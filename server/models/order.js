import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  date: { type: Date, required: true, default: Date.now },
  buyer: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  options: [
    {
      id: { type: String, required: true },
      price: { type: Number, required: true },
      title: { type: String, required: true },
      image: { type: String, required: false },
    },
  ],
  products: [
    {
      id: { type: String, required: true },
      title: { type: String, required: true },
      price: { type: Number, required: true, min: 0 },
      onSale: { type: Boolean, required: true },
      discount: { type: Number, required: true, min: 0, max: 100 },
      quantity: { type: Number, required: true, min: 0 },
      image: { type: String, required: true },
    },
  ],
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
