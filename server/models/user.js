import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, minlength: 3 },
    password: { type: String, required: true, minlength: 6},
    first_name: { type: String, required: true, minlength: 3 },
    last_name: { type: String, required: true, minlength: 3 },
    email: { type: String, required: false },
    phone_number: { type: String, required: false },
    role: { type: String, required: true, default: 'user' },
    user_type: { type: String, required: true, default: 'default' },
    addresses: [{ type: mongoose.Types.ObjectId, required: false, ref: 'Address' }],
    basket: { type: mongoose.Types.ObjectId, required: false, ref: 'Basket' },
    // orders: [{ type: mongoose.Types.ObjectId, required: false, ref: 'Order' }]
});

export default mongoose.model('User', userSchema);