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

module.exports = {
    create,
    show,
};