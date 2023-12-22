import mongoose from "mongoose";

const basketSchema = new mongoose.Schema({
  user: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  products: [
    {
      id: { type: String, required: true },
      title: { type: String, required: true },
      price: { type: Number, required: true, min: 0 },
      onSale: { type: Boolean, required: true },
      discount: { type: Number, required: true, min: 0, max: 100 },
      quantity: { type: Number, required: true, min: 0 },
      slug: { type: String, required: true },
      image: { type: String, required: true },
    },
  ],
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
