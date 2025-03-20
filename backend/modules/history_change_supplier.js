const mongoose = require('mongoose');

const supplierCHistorySchema = new mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
    employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
    supplier: { type: String, required: true },
    action: { type: String, enum: ['update', 'delete'], required: true },
    timestamp: { type: Date, default: Date.now },
    details: { type: String }
});

const SupplierCHistory = mongoose.model('supplierCHistory', supplierCHistorySchema, 'supplierCHistory');

module.exports = SupplierCHistory;