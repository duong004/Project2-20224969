const mongoose = require('mongoose');

const Bill_Schema = new mongoose.Schema({
    orderDate: { type: Date, default: Date.now },
    totalAmount: { type: String, required: true },
    items: [
        {
            productID: { type: mongoose.Schema.Types.ObjectId, ref: 'Products', required: true },
            name: { type: String, required: true },
            quantity: { type: Number, required: true },
            price: { type: String, required: true },
        }
    ],
});

const Bills = mongoose.model('Bills', Bill_Schema, 'Bills');

module.exports = Bills;