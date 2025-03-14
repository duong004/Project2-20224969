const mongoose = require('mongoose');

const orderDetailHistorySchema = new mongoose.Schema({
    orderId: { // Liên kết tới _id của OrderHistory
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OrderHistory',
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products',
        required: true
    },
    price: {
        type: String,
        required: true
    },
    quantity: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
}, { 
    timestamps: true,
});

const OrderDetailHistory = mongoose.model('OrderDetailHistory', orderDetailHistorySchema, 'Order_Detail_History');

module.exports = OrderDetailHistory;