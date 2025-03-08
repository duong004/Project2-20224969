const mongoose = require('mongoose');

const customerSchema = new mongoose.mongoose.Schema({
    name: { type: String },
    phone: { type: String, required: true, unique: true },
    email: { type: String },
    owner: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Users', 
        required: true 
    },
    creater: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Users', 
        required: true 
    },
}, { timestamps: true });

const Customer = mongoose.model('Customers', customerSchema, 'Customers');

module.exports = Customer;