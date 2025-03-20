const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
    employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
    product: { type: String, required: true },
    action: { type: String, enum: ['create', 'update', 'delete'], required: true },
    timestamp: { type: Date, default: Date.now },
    details: { type: String } // Mô tả chi tiết thay đổi
});

const History = mongoose.model('historys', historySchema, 'historys');

module.exports = History;