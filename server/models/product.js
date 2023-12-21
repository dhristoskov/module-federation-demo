import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    id: { type: String, required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    onSale: { type: Boolean, required: true },
    discount: { type: Number, required: true, min: 0, max: 100 },
    quantity: { type: Number, required: true, min: 0 },
    image: { type: String, required: true },
    slug: { type: String, required: true },
    basket: { type: mongoose.Types.ObjectId, required: true, ref: 'Basket' }
});

export default mongoose.model('Product', productSchema);