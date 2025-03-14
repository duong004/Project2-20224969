const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    sku: { type: String, required: true, unique: true },
    price: { type: String, required: true },
    stock_in_shelf: { type: Number, default: 0 },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
    image: {
        secure_url: String,
        public_id: String,
    },
}, { 
    timestamps: true,
});

const Products = mongoose.model('Products', productSchema, 'Products');

module.exports = Products;