const mongoose = require('mongoose');

const SuppliersSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    email: { type: String },
    owner: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Users', 
        required: true 
    },
    creater: { // Người tạo ra nhà cung cấp này trong hệ thống
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Users', 
        required: true 
    },
}, { timestamps: true });

const Suppliers = mongoose.model('Suppliers', SuppliersSchema, 'Suppliers');

module.exports = Suppliers;