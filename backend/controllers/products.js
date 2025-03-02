const Products = require('../modules/products');

const create = async (req, res) => {
    try {
        const { name, sku, price, stock_in_shelf } = req.body;
        
        const productExists = await Products.findOne({ sku });
        if (productExists) {
            return res.status(400).json({ message: 'SKU đã tồn tại' });
        }

        const newProduct = new Products({
            name,
            sku,
            price,
            stock_in_shelf,
            owner: '66515971167b58098c9b4e67' // Tạm thời hardcode owner ID
        });
        await newProduct.save();
        res.status(201).json({ message: "Success", product: newProduct });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const show = async (req, res) => {
    try {
        const products = await Products.find({});
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error', error });
    }
};

const edit = async (req, res) => {
    try {
        const { product_edit } = req.body;
        const updatedProduct = await Products.findByIdAndUpdate(
            product_edit._id,
            product_edit,
            { new: true } // Trả về document sau khi update
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({ message: "success", product: updatedProduct });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deletes = async (req, res) => {
    try {
        const { product_delete } = req.body;
        const product = await Products.findByIdAndDelete(product_delete._id);
        
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    create,
    show,
    edit,
    deletes,
};