import mongoose from 'mongoose';

const basketSchema = new mongoose.Schema({
    user: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
    products: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Product' }]
});

export default mongoose.model('Basket', basketSchema);