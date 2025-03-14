const mongoose = require('mongoose');

const orderHistorySchema = new mongoose.Schema({
    supplierId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Suppliers',
        required: true
    },
    generalStatus: {
        type: String, 
        required: true 
    },
    amount: { // Tổng số tiền của đơn nhập
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

const OrderHistory = mongoose.model('OrderHistory', orderHistorySchema, 'Order_History');

module.exports = OrderHistory;