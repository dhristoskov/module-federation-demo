import mongoose from "mongoose";

const basketSchema = new mongoose.Schema({
  user: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  products: [{ type: mongoose.Types.ObjectId, required: true, ref: "Product" }],
  options: [
    {
      id: { type: Number, required: true },
      price: { type: Number, required: true },
      title: { type: String, required: true },
      image: { type: String, required: false },
    },
  ],
});

export default mongoose.model("Basket", basketSchema);
